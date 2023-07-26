import { BigNumber, ethers } from "ethers";
import { WEVMOS_CONTRACT_ADDRESS } from "../../../constants";
import { KEPLR_KEY } from "evmos-wallet";
import { useContractTransaction } from "evmos-wallet";
import { TransactionResponse } from "@ethersproject/providers";
import { createContract } from "evmos-wallet";
import { WEVMOS } from "../abis/WEVMOS/WEVMOS";
import { WEVMOSABI } from "../abis/WEVMOS/WEVMOSABI";

export function useWEVMOS(provider: string) {
  const { executeKeplr } = useContractTransaction();

  let iWEVMOS = new ethers.utils.Interface(WEVMOSABI);

  async function deposit(
    amount: BigNumber,
    hexAddress: string
  ): Promise<TransactionResponse> {
    if (provider === KEPLR_KEY) {
      let encodedData = iWEVMOS.encodeFunctionData("deposit");
      return await executeKeplr(
        encodedData,
        amount,
        WEVMOS_CONTRACT_ADDRESS,
        hexAddress
      );
    } else {
      const contract = await createContract(
        WEVMOS_CONTRACT_ADDRESS,
        WEVMOSABI,
        provider
      );
      return await (contract as WEVMOS).deposit({
        value: amount,
      });
    }
  }

  async function withdraw(
    amount: BigNumber,
    hexAddress: string
  ): Promise<TransactionResponse> {
    if (provider === KEPLR_KEY) {
      let encodedData = iWEVMOS.encodeFunctionData("withdraw", [amount]);
      return await executeKeplr(
        encodedData,
        null,
        WEVMOS_CONTRACT_ADDRESS,
        hexAddress
      );
    } else {
      const contract = await createContract(
        WEVMOS_CONTRACT_ADDRESS,
        WEVMOSABI,
        provider
      );
      return await (contract as WEVMOS).withdraw(amount);
    }
  }

  return {
    deposit,
    withdraw,
  };
}
