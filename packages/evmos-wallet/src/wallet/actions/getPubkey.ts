import { assertIf, isCallable } from "helpers";
import { getAccount } from "wagmi/actions";

export async function getPubkey({ cosmosChainId }: { cosmosChainId?: string }) {
  const { connector } = getAccount();
  assertIf(connector, "No connector found");
  assertIf(
    "getPubkey" in connector && isCallable(connector.getPubkey),
    `Connector ${connector.id} does not support getPubkey`,
  );
  const pubkey = await connector.getPubkey({
    cosmosChainId,
  });
  assertIf(pubkey instanceof Uint8Array, "No pubkey returned from connector");
  return pubkey;
}
