// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { useAccount } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { switchToEvmosChain } from "@evmosapps/evmos-wallet/src/wallet/actions/switchToEvmosChain";
import { E, Log } from "helpers";
import { useMemo } from "react";
import { ethToBech32 } from "@evmosapps/evmos-wallet";

import { writeContractIBCOutpost } from "@evmosapps/evmos-wallet";
import { generateStrideMemo } from "./memoGenerator";

// eslint-disable-next-line no-secrets/no-secrets
const strideFallbackAddress = "stride1yzw585gd8ajymcaqt9e98k5tt66qpzspc93ghf";

export function useStridePrecompile() {
  const { address } = useAccount();

  const { mutate, error, ...rest } = useMutation({
    mutationKey: ["stride-swap"],
    mutationFn: async function liquidStake({ amount }: { amount: bigint }) {
      if (!address) throw new Error("Not connected");

      await switchToEvmosChain();

      return writeContractIBCOutpost({
        sender: address,
        receiver: ethToBech32(address, "stride"),
        tokenAmount: amount,
        tokenDenom: "aevmos",
        memo: generateStrideMemo(
          ethToBech32(address, "evmos"),
          strideFallbackAddress,
        ),
        estimatedGas: 1227440n,
      });
    },
    onError: (e) => {
      Log().error(e);
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
    liquidStake: mutate,
    errorMessage: mappedError,
    ...rest,
  };
}
