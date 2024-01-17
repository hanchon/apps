import { raise } from "helpers";
import { EVMOS_CONFIG_MAP } from "helpers/src/evmos-info";
import { useChainId } from "wagmi";
const EVMOS_CONFIG_BY_EVM_ID = new Map(
  Object.values(EVMOS_CONFIG_MAP).map((config) => [config.id, config.ref])
);

export const useEvmosChainRef = () => {
  const chainId = useChainId();
  return EVMOS_CONFIG_BY_EVM_ID.get(chainId) ?? raise("Couldn't get chain id");
};
