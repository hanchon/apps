import { JsonRpcProvider } from "@ethersproject/providers";

export async function signKeplrTx(tx: any): Promise<any> {
  const signer = await getKeplrBech32Account();
  //@ts-ignore
  const signedTx = await window.keplr.signEthereum(
    "evmos_9001-2",
    signer,
    JSON.stringify(tx),
    "transaction"
  );
  return signedTx;
}

export async function getKeplrBech32Account(): Promise<string> {
  //@ts-ignore
  const offlineSigner = window.getOfflineSigner("evmos_9001-2");
  const wallets = await offlineSigner.getAccounts();
  const signerAddressBech32 = wallets[0].address;
  return signerAddressBech32;
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
  tx: any
): Promise<any> {
  const gasLimit = await provider.estimateGas(tx);
  const gasFee = await provider.getFeeData();

  if (!gasFee.maxPriorityFeePerGas || !gasFee.maxFeePerGas) {
    // Handle error
    throw new Error(`Keplr Gas Estimation Failed`);
  }
  const nonce = await provider.getTransactionCount(signer);

  const newTx = {
    ...tx,
    chainId: 9001,
    value: tx.value ? tx.value.toHexString() : "0x0",
    nonce,
    gasLimit: gasLimit.toHexString(),
    maxPriorityFeePerGas: gasFee.maxPriorityFeePerGas.toHexString(),
    maxFeePerGas: gasFee.maxFeePerGas.toHexString(),
    type: 2,
    accessList: [],
  };
  return newTx;
}
