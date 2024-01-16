"use server";

import { ChainEntity } from "../autogen/chain-entity";
import { loadRegistryChainExtensions } from "./load-registry-chain-extensions";
import { fetchChainRegistryDirJsonFiles } from "./fetch-chain-registry-dir-json-files";
import { unstable_cache } from "next/cache";
import { omit } from "lodash-es";

const EVMOS_OVERWRITES = {
  web3: [
    "https://evmos.lava.build",
    "https://evmos-json-rpc.stakely.io",
    "https://jsonrpc-evmos-ia.cosmosia.notional.ventures/",
    "https://jsonrpc.evmos.nodestake.top",
    "https://evmos-mainnet.public.blastapi.io",
    "https://evmos-evm.publicnode.com",
    "https://evmos-rpc.gateway.pokt.network",
    "https://jsonrpc-evmos.mms.team:443",
    "https://web3endpoints.com/evmos-mainnet",
    "https://evmos-json.antrixy.org",
  ],
  rest: [
    "https://rest.evmos.lava.build",
    "https://evmos-lcd.stakely.io",
    "https://api.evmos.nodestake.top",
    "https://api.evmos.silknodes.io",
    "https://evmos-rest.publicnode.com",
    "https://api-evmos.mms.team:443",
    "https://evmos-rest.antrixy.org",
  ],
};

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

      ...(configuration.identifier === "evmos" ? EVMOS_OVERWRITES : {}),
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
