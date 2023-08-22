import { toHex } from "viem";
import { getKeplrAccounts } from "./getKeplrAccounts";

export async function getKeplrAccountPubKey(chainId: string) {
  const [account] = await getKeplrAccounts(chainId);

  return toHex(account.pubkey);
}
