"use client";
import StrideABI from "./abi/StridePrecompileABI.json";

import { ethToBech32, ethToEvmos } from "@evmosapps/evmos-wallet";
import { writeContract } from "wagmi/actions";
import { useAccount, useConfig } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { switchToEvmosChain } from "@evmosapps/evmos-wallet/src/wallet/actions/switchToEvmosChain";

const STRIDE_PRECOMPILE_ADDRESS = "0xeE44c15a354F72bb787FFfe2975872380E37afED";

export function useStridePrecompile() {
  const { address } = useAccount();

  const config = useConfig();
  const { mutate, ...rest } = useMutation({
    mutationKey: ["stride-swap"],
    mutationFn: async function liquidStake({ amount }: { amount: string }) {
      if (!address) throw new Error("Not connected");

      await switchToEvmosChain();

      return writeContract(config, {
        address: STRIDE_PRECOMPILE_ADDRESS,
        abi: StrideABI,
        functionName: "liquidStakeEvmos",
        account: address,
        args: [amount, ethToBech32(address, "stride"), ethToEvmos(address)],
        gas: BigInt(1227440),
      });
    },
    onError: (e) => {
      // eslint-disable-next-line no-console
      console.error(e);
    },
  });

  return {
    liquidStake: mutate,
    ...rest,
  };
}
