"use client";
import StrideABI from "./abi/StridePrecompileABI.json";

import { ethToBech32 } from "@evmosapps/evmos-wallet";
import { writeContract } from "wagmi/actions";
import { useAccount, useConfig } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { switchToEvmosChain } from "@evmosapps/evmos-wallet/src/wallet/actions/switchToEvmosChain";

const STRIDE_PRECOMPILE_ADDRESS = "0x0000000000000000000000000000000000000900";
const CHANNEL_ID = "channel-215";
const WEVMOS_ERC20_ADDRESS = "0xcc491f589b45d4a3c679016195b3fb87d7848210";

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
        functionName: "liquidStake",
        account: address,
        args: [
          [
            CHANNEL_ID,
            address,
            address,
            WEVMOS_ERC20_ADDRESS,
            amount,
            ethToBech32(address, "stride"),
          ],
        ],
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
