import { getAccount, getWalletClient, switchNetwork } from "wagmi/actions";
import { assertIf, raise } from "helpers";
import { TypedData } from "../../utils";
import { Hex, fromHex } from "viem";

export async function signTypedDataMessage(transaction: TypedData) {
  const { address = raise("WALLET_NOT_CONNECTED") } = getAccount();
  await switchNetwork({
    chainId: fromHex(transaction.domain.chainId as Hex, "number"),
  });

  const client = (await getWalletClient()) ?? raise("PROVIDER_NOT_AVAILABLE");

  const signature = await client.request({
    method: "eth_signTypedData_v4",
    params: [address, JSON.stringify(transaction)],
  });

  assertIf(typeof signature === "string", "COULD_NOT_SIGN_TRANSACTION");
  return signature;
}
