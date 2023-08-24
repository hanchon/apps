import { VestingABI } from "./abis/VestingABI";
import { Period } from "@evmos/transactions";
import { prepareWriteContract, writeContract } from "wagmi/actions";
import { useAccount } from "wagmi";

const VESTING_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000803";

export function useVestingPrecompile() {
  const {address} = useAccount()

  async function createClawbackVestingAccount(
    funderAddress: string,
    vestingAddress: string,
    enableGovClawback: boolean
  ) {
    const { request } = await prepareWriteContract({
      address: VESTING_CONTRACT_ADDRESS,
      abi: VestingABI,
      functionName: "createClawbackVestingAccount",
      value: 0n,
      account: address as `0x${string}`,
      args: [
        funderAddress,
        vestingAddress,
        enableGovClawback,
      ],
    });
    return await writeContract(request);
  }
  
  async function fundVestingAccount(
    funderAddress: string,
    vestingAddress: string,
    startTime: number,
    lockupPeriods: Period[],
    vestingPeriods: Period[],
  ) {

    const { request } = await prepareWriteContract({
      address: VESTING_CONTRACT_ADDRESS,
      abi: VestingABI,
      functionName: "fundVestingAccount",
      value: 0n,
      account: address as `0x${string}`,
      args: [
        funderAddress,
        vestingAddress,
        startTime,
        lockupPeriods,
        vestingPeriods,
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
      account: address as `0x${string}`,
      args: [founderAddress, accountAddress, destinationAddress],
    });
    return await writeContract(request);
  }

  return {
    fundVestingAccount,
    clawback,
    createClawbackVestingAccount,
  } as const;
}
