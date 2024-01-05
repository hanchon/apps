import { ChainEntity } from "../autogen/chain-entity";
export const loadRegistryChainExtensions = async () => {
  const chains: Record<string, unknown> = await import(
    "./extend-registry/chains"
  );
  return Object.values(chains) as ChainEntity[];
};
