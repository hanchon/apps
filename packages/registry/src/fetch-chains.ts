"use server";

import { ChainEntity } from "../autogen/chain-entity";
import { loadRegistryChainExtensions } from "./load-registry-chain-extensions";
import { fetchChainRegistryDirJsonFiles } from "./fetch-chain-registry-dir-json-files";
import { unstable_cache } from "next/cache";

export async function fetchChains() {
  const fromRegistry =
    fetchChainRegistryDirJsonFiles<ChainEntity>("chainConfig");
  const fromExtensions = loadRegistryChainExtensions();

  const all = (await Promise.all([fromRegistry, fromExtensions])).flatMap(
    (x) => x
  );
  const flattened = all.flatMap(({ configurations, ...chain }) =>
    configurations.map((configuration) => ({
      ...chain,
      ...configuration,
    }))
  );

  //  sanity check
  if (flattened.length !== new Set(flattened.map((x) => x.identifier)).size) {
    throw new Error("Duplicate chain identifiers");
  }
  return { chains: flattened, dt: new Date().toISOString() };
}

export const cachedFetchChains = unstable_cache(
  fetchChains,

  ["fetchChains"],
  {
    revalidate: 60 * 60 * 24,
  }
);
