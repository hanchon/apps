// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { useAccount } from "wagmi";

import { useMutation } from "@tanstack/react-query";
import { switchToEvmosChain } from "@evmosapps/evmos-wallet/src/wallet/actions/switchToEvmosChain";
import { E, Log } from "helpers";
import { useMemo } from "react";

import {
  AEVMOS_DENOM_IN_OSMOSIS,
  EVMOS_ERC20_IN_EVMOS,
  GenerateOsmosisMemo as generateOsmosisMemo,
  OSMOSIS_OUTPOST_CONTRACT,
  UOSMO_DENOM_ERC20_IN_EVMOS,
  UOSMO_DENOM_IBC_IN_EVMOS,
  UOSMO_DENOM_IN_OSMOSIS,
} from "./memoGenerator";
import {
  ethToBech32,
  getActiveProviderKey,
  writeContractIBCOutpost,
} from "@evmosapps/evmos-wallet";
import { sendEvent, SUCCESSFUL_SWAP_TX, UNSUCCESSFUL_SWAP_TX } from "tracker";

// eslint-disable-next-line no-secrets/no-secrets
const osmosisFallbackAddress = "osmo1yzw585gd8ajymcaqt9e98k5tt66qpzspn4zy4h";

// NOTE: Input and output must be the erc20 denominations of the coins in the evmos chain
export function useOsmosisPrecompile() {
  const { address } = useAccount();
  const { mutate, error, ...rest } = useMutation({
    mutationKey: ["osmosis-swap"],
    mutationFn: async function swap({
      input,
      output,
      amount,
      slippage_tolerance,
    }: {
      input: string;
      output: string;
      amount: bigint;
      slippage_tolerance: number;
    }) {
      // Generate denoms
      const isInputOsmosis = input === UOSMO_DENOM_ERC20_IN_EVMOS;
      if (
        (isInputOsmosis && output !== EVMOS_ERC20_IN_EVMOS) ||
        (!isInputOsmosis && output !== UOSMO_DENOM_ERC20_IN_EVMOS)
      ) {
        throw new Error("Invalid denominations");
      }

      // NOTE: the value inside the memo is the coin denom in the osmosis chain
      const swapDenomWanted = isInputOsmosis
        ? AEVMOS_DENOM_IN_OSMOSIS
        : UOSMO_DENOM_IN_OSMOSIS;

      // NOTE: The value in the IBC transfer must be the IBC denom in the Evmos chain, the transfer function automatically converts erc20 to ibc in case it's needed
      const transferDenom = isInputOsmosis
        ? UOSMO_DENOM_IBC_IN_EVMOS
        : "aevmos";

      if (!address) throw new Error("Not connected");

      await switchToEvmosChain();

      const memo = generateOsmosisMemo({
        outputDenom: swapDenomWanted,
        slippagePercentage: slippage_tolerance.toString(),
        windowSeconds: 30,
        receiver: ethToBech32(address, "evmos"),
        fallbackAddress: osmosisFallbackAddress,
      });

      const params = {
        sender: address,
        receiver: OSMOSIS_OUTPOST_CONTRACT,
        tokenAmount: amount,
        tokenDenom: transferDenom,
        memo: memo,
        estimatedGas: 1227440n,
      };

      return writeContractIBCOutpost(params);
    },
    onSuccess(_, variables) {
      const isInputOsmosis = variables.input === UOSMO_DENOM_ERC20_IN_EVMOS;
      sendEvent(SUCCESSFUL_SWAP_TX, {
        Token: isInputOsmosis ? "OSMO" : "EVMOS",
        Network: "Evmos",
        "User Wallet Address": address,
        "Wallet Provider": getActiveProviderKey(),
        "dApp Name": "Osmosis",
      });
    },
    onError: (e, variables) => {
      const isInputOsmosis = variables.input === UOSMO_DENOM_ERC20_IN_EVMOS;
      Log().error(e);
      sendEvent(UNSUCCESSFUL_SWAP_TX, {
        Token: isInputOsmosis ? "OSMO" : "EVMOS",
        Network: "Evmos",
        "User Wallet Address": address,
        "Wallet Provider": getActiveProviderKey(),
        "Error Message": e.message,
        "dApp Name": "Osmosis",
      });
    },
  });

  const mappedError = useMemo(() => {
    if (!error) {
      return null;
    }
    if (
      E.match.byPattern(error, /(Request rejected|User rejected the request)/g)
    ) {
      return "Request rejected";
    }
    return "Error generating transaction, please try again";
  }, [error]);

  return {
    swap: mutate,
    errorMessage: mappedError,
    ...rest,
  };
}
