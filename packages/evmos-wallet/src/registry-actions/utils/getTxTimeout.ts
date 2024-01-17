import { apiTendermintStatus } from "../../api";
import { getChain } from "../get-chain";

export const getTxTimeout = async (prefix: string) => {
  const chain = getChain(prefix);
  const { result } = await apiTendermintStatus(chain.tendermintRest);
  return {
    revisionHeight: BigInt(chain.cosmosId.split("-").at(-1) ?? 0),
    revisionNumber: BigInt(result.sync_info.latest_block_height) + 500n,
  };
};
