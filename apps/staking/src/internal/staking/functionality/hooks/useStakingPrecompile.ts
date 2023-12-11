import StakingABI from "../abis/StakingABI.json";
import { writeContract } from "wagmi/actions";
import { useSelector } from "react-redux";
import { StoreType } from "evmos-wallet";
import { BigNumber } from "@ethersproject/bignumber";

const STAKING_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000800";

export function useStakingPrecompile() {
  const address = useSelector((state: StoreType) => state.wallet.value);

  async function delegate(
    delegatorAddress: string,
    validatorAddress: string,
    amount: BigNumber,
  ) {
    return await writeContract({
      mode: "prepared",
      request: {
        address: STAKING_CONTRACT_ADDRESS,
        abi: StakingABI,
        functionName: "delegate",
        value: 0n,
        account: address.evmosAddressEthFormat as `0x${string}`,
        args: [delegatorAddress, validatorAddress, amount],
      },
    });
  }

  async function undelegate(
    delegatorAddress: string,
    validatorAddress: string,
    amount: BigNumber,
  ) {
    return await writeContract({
      mode: "prepared",
      request: {
        address: STAKING_CONTRACT_ADDRESS,
        abi: StakingABI,
        functionName: "undelegate",
        value: 0n,
        account: address.evmosAddressEthFormat as `0x${string}`,
        args: [delegatorAddress, validatorAddress, amount],
      },
    });
  }

  async function redelegate(
    delegatorAddress: string,
    validatorSrcAddress: string,
    validatorDstAddress: string,
    amount: BigNumber,
  ) {
    return await writeContract({
      mode: "prepared",
      request: {
        address: STAKING_CONTRACT_ADDRESS,
        abi: StakingABI,
        functionName: "redelegate",
        value: 0n,
        account: address.evmosAddressEthFormat as `0x${string}`,
        args: [delegatorAddress, validatorSrcAddress, validatorDstAddress, amount],
      },
    });
  }

  async function cancelUnbondingDelegation(
    delegatorAddress: string,
    validatorAddress: string,
    amount: BigNumber,
    creationHeight: string
  ) {
    return await writeContract({
      mode: "prepared",
      request: {
        address: STAKING_CONTRACT_ADDRESS,
        abi: StakingABI,
        functionName: "cancelUnbondingDelegation",
        value: 0n,
        account: address.evmosAddressEthFormat as `0x${string}`,
        args: [delegatorAddress, validatorAddress, amount, creationHeight],
      },
    });
  }


  return {
    delegate,
    undelegate,
    redelegate,
    cancelUnbondingDelegation
  } as const;
}
