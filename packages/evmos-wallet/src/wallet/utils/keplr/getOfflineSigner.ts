import { getKeplrProvider } from "./getKeplrProvider";

export async function getOfflineSigner(chainId: string) {
  const keplr = await getKeplrProvider();
  await keplr.enable(chainId);
  return keplr.getOfflineSigner(chainId);
}
