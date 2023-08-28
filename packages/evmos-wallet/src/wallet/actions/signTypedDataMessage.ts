import { getAccount, getWalletClient } from "wagmi/actions";
import { assertIf, convertTextToBytes, raise } from "helpers";
import { TypedData } from "../../utils";
import { Connector } from "wagmi";

export async function signTypedDataMessage(
  transaction: TypedData,
  connector: Connector | undefined = undefined
) {
  const { address = raise("WALLET_NOT_CONNECTED") } = getAccount();

  const client = (await getWalletClient()) ?? raise("PROVIDER_NOT_AVAILABLE");

  if (connector?.id === "safe") {
    transaction.domain.verifyingContract = address;
    transaction.domain.salt = convertTextToBytes(transaction.domain.salt);
  }

  const signature = await client.request({
    method: "eth_signTypedData_v4",
    params: [address, JSON.stringify(transaction)],
  });

  assertIf(typeof signature === "string", "COULD_NOT_SIGN_TRANSACTION");
  return signature;
}
