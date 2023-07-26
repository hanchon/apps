import { JsonRpcProvider } from "@ethersproject/providers";
import { EthSignType } from "@keplr-wallet/types";
import { UnsignedTransaction } from "ethers";
import { TransactionRequest } from "@ethersproject/abstract-provider";

export async function signKeplrTx(
  tx: UnsignedTransaction
): Promise<Uint8Array> {
  const signer = await getKeplrBech32Account();
  if (window.keplr) {
    const signedTx = await window.keplr.signEthereum(
      "evmos_9001-2",
      signer,
      JSON.stringify(tx),
      EthSignType.TRANSACTION
    );
    return signedTx;
  }
  return new Uint8Array();
}

export async function getKeplrBech32Account(): Promise<string> {
  if (window.getOfflineSigner) {
    const offlineSigner = window.getOfflineSigner("evmos_9001-2");
    const wallets = await offlineSigner.getAccounts();
    const signerAddressBech32 = wallets[0].address;
    return signerAddressBech32;
  }
  return "";
}

/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
export default function isZero(hexNumberString: string) {
  return /^0x0*$/.test(hexNumberString);
}

export async function convertToKeplrTx(
  provider: JsonRpcProvider,
  signer: string,
  tx: UnsignedTransaction
): Promise<UnsignedTransaction> {
  const completeTx = { ...tx, from: signer };

  const gasLimit = await provider.estimateGas(completeTx as TransactionRequest);
  const gasFee = await provider.getFeeData();

  if (!gasFee.maxPriorityFeePerGas || !gasFee.maxFeePerGas) {
    // Handle error
    throw new Error(`Keplr Gas Estimation Failed`);
  }
  const nonce = await provider.getTransactionCount(signer);

  const newTx = {
    ...completeTx,
    chainId: 9001,
    nonce,
    gasLimit: gasLimit.toHexString(),
    maxPriorityFeePerGas: gasFee.maxPriorityFeePerGas.toHexString(),
    maxFeePerGas: gasFee.maxFeePerGas.toHexString(),
    type: 2,
    accessList: [],
  };
  return newTx;
}
