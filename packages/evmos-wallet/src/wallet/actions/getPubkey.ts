import { assert, isCallable } from "helpers";
import { getAccount } from "wagmi/actions";
import { wagmiConfig } from "../wagmi";

export async function getPubkey({ cosmosChainId }: { cosmosChainId?: string }) {
  const { connector } = getAccount(wagmiConfig);
  assert(connector, "No connector found");
  assert(
    "getPubkey" in connector && isCallable(connector.getPubkey),
    `Connector ${connector.id} does not support getPubkey`
  );
  const pubkey = await connector.getPubkey({
    cosmosChainId,
  });
  assert(pubkey instanceof Uint8Array, "No pubkey returned from connector");
  return pubkey;
}
