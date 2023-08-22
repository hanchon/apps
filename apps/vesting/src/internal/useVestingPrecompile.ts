import { VestingABI } from "./abis/VestingABI";
import { Period } from "@evmos/transactions";
import { prepareWriteContract, writeContract } from "wagmi/actions";

const VESTING_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000803";

export function useVestingPrecompile() {
  async function createClawbackVestingAccount(
    fromAddress: string,
    toAddress: string,
    startTime: number,
    lockupPeriods: Period[],
    vestingPeriods: Period[],
    merge: boolean,
  ) {
    const { request } = await prepareWriteContract({
      address: VESTING_CONTRACT_ADDRESS,
      abi: VestingABI,
      functionName: "createClawbackVestingAccount",
      value: 0n,
      account: fromAddress as `0x${string}`,
      args: [
        fromAddress,
        toAddress,
        startTime,
        lockupPeriods,
        vestingPeriods,
        merge,
      ],
    });
    return await writeContract(request);
  }

  async function clawback(
    founderAddress: string,
    accountAddress: string,
    destinationAddress: string,
  ) {
    const { request } = await prepareWriteContract({
      address: VESTING_CONTRACT_ADDRESS,
      abi: VestingABI,
      functionName: "createClawbackVestingAccount",
      value: 0n,
      account: founderAddress as `0x${string}`,
      args: [founderAddress, accountAddress, destinationAddress],
    });
    return await writeContract(request);
  }

  return {
    createClawbackVestingAccount,
    clawback,
  } as const;
}
