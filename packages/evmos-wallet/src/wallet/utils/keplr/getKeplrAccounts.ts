import { getOfflineSigner } from "./getOfflineSigner";

export async function getKeplrAccounts(chainId: string) {
  const signer = await getOfflineSigner(chainId);
  return signer.getAccounts();
}
