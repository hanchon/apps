import { ethers } from "ethers";

import { KEPLR_KEY } from "evmos-wallet";
import { useContractTransaction } from "evmos-wallet";
import { TransactionResponse } from "@ethersproject/providers";
import { createContract } from "evmos-wallet";
import { VestingI } from "./abis/Vesting";
import { VestingABI } from "./abis/VestingABI";
import { Period } from "@evmos/transactions";

const VESTING_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000803";

export function useVestingPrecompile(provider: string) {
  const { executeKeplr } = useContractTransaction();

  let iVesting = new ethers.utils.Interface(VestingABI);

  async function createClawbackVestingAccount(
    fromAddress: string,
    toAddress: string,
    startTime: number,
    lockupPeriods: Period[],
    vestingPeriods: Period[],
    merge: boolean
  ): Promise<TransactionResponse> {
    if (provider === KEPLR_KEY) {
      let encodedData = iVesting.encodeFunctionData(
        "createClawbackVestingAccount",
        [
          fromAddress,
          toAddress,
          startTime,
          lockupPeriods,
          vestingPeriods,
          merge,
        ]
      );
      return await executeKeplr(
        encodedData,
        null,
        VESTING_CONTRACT_ADDRESS,
        fromAddress
      );
    } else {
      const contract = await createContract(
        VESTING_CONTRACT_ADDRESS,
        VestingABI,
        provider
      );
      return await (contract as VestingI).createClawbackVestingAccount(
        fromAddress,
        toAddress,
        startTime,
        lockupPeriods,
        vestingPeriods,
        merge
      );
    }
  }

  async function clawback(
    founderAddress: string,
    accountAddress: string,
    destinationAddress: string
  ): Promise<TransactionResponse> {
    if (provider === KEPLR_KEY) {
      let encodedData = iVesting.encodeFunctionData("clawback", [
        founderAddress,
        accountAddress,
        destinationAddress,
      ]);
      return await executeKeplr(
        encodedData,
        null,
        VESTING_CONTRACT_ADDRESS,
        founderAddress
      );
    } else {
      const contract = await createContract(
        VESTING_CONTRACT_ADDRESS,
        VestingABI,
        provider
      );
      return await (contract as VestingI).clawback(
        founderAddress,
        accountAddress,
        destinationAddress
      );
    }
  }

  return {
    createClawbackVestingAccount,
    clawback,
  };
}
