import { ChainEntity } from "@evmosapps/registry/autogen/chain-entity";

export const loadRegistryChainExtensions = async () => {
  const chains: Record<string, unknown> = await import(
    "@evmosapps/registry/src/extend-registry/chains"
  );
  return Object.values(chains) as ChainEntity[];
};
