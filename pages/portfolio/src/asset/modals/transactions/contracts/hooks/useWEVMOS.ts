import WETH_ABI from "../../contracts/abis/WEVMOS/WEVMOS.json";
import { WEVMOS_CONTRACT_ADDRESS } from "../../../constants";
import {
  prepareSendTransaction,
  prepareWriteContract,
  sendTransaction,
  writeContract,
} from "wagmi/actions";

import { BigNumber } from "@ethersproject/bignumber";
import { encodeFunctionData } from "viem";

export function useWEVMOS() {
  async function deposit(amount: BigNumber, hexAddress: string) {
    const { request } = await prepareWriteContract({
      address: WEVMOS_CONTRACT_ADDRESS,
      abi: WETH_ABI,
      functionName: "deposit",
      value: amount.toBigInt(),
      account: hexAddress as `0x${string}`,
    });
    return await writeContract(request);
  }

  async function withdraw(amount: BigNumber, hexAddress: string) {
    const req = await prepareSendTransaction({
      to: WEVMOS_CONTRACT_ADDRESS,
      account: hexAddress as `0x${string}`,
      value: 0n,
      data: encodeFunctionData({
        abi: WETH_ABI,
        functionName: "withdraw",
        args: [amount.toBigInt()],
      }),
    });
    return await sendTransaction(req);
  }

  return {
    deposit,
    withdraw,
  } as const;
}
