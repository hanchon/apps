import { BigNumber } from "ethers";

import { UnsignedTransaction, ethers } from "ethers";
import { convertToKeplrTx, signKeplrTx } from "../../hooks/keplr_utils";
import { JsonRpcProvider, TransactionResponse } from "@ethersproject/providers";

export async function signAndSubmitKeplr(
  tx: UnsignedTransaction,
  customHttpProvider: JsonRpcProvider
) {
  const res = await signKeplrTx({ ...tx });
  const serializedTx = ethers.utils.serializeTransaction(tx, res);

  return await customHttpProvider.sendTransaction(serializedTx);
}

export function useContractTransaction() {
  let customHttpProvider = new JsonRpcProvider(
    "https://eth.bd.evmos.org:8545/"
  );

  async function executeKeplr(
    encodedData: string,
    amount: BigNumber | null,
    contractAddress: string,
    hexAddress: string
  ): Promise<TransactionResponse> {
    let data: UnsignedTransaction = {
      data: encodedData,
      to: contractAddress,
    };

    amount ? (data["value"] = amount) : null;

    let unsignedTx = await convertToKeplrTx(
      customHttpProvider,
      hexAddress,
      data
    );

    return await signAndSubmitKeplr(unsignedTx, customHttpProvider);
  }
  return { executeKeplr };
}
