"use server";
import { devModeCache } from "helpers/src/dev/dev-mode-cache";

import { TokenEntity } from "../autogen/token-entity";
import { loadRegistryTokenExtensions } from "./load-registry-token-extensions";
import { raise } from "helpers";
import { ChainType } from "./types";
import { unstable_cache as cache } from "next/cache";
import { fetchChainRegistryDirJsonFiles } from "./fetch-chain-registry-dir-json-files";

const revalidate = 3600;
export const _fetchTokens = devModeCache(
  async function fetchTokens() {
    const fromRegistry = fetchChainRegistryDirJsonFiles<TokenEntity>("tokens");

    const fromExtensions = loadRegistryTokenExtensions();
    const tokens = (await Promise.all([fromRegistry, fromExtensions]))
      .flatMap((x) => x)
      .map((token) => {
        const source = token.ibc?.source ?? raise("Token source not found");
        let networkType: ChainType = "mainnet";

        if (source.endsWith("testnet")) networkType = "testnet";
        if (source.endsWith("localnet")) networkType = "localnet";

        return {
          ...token,
          source,
          networkType,
          isMainnet: networkType === "mainnet",
        };
      });

    return {
      tokens,
      dt: new Date().toISOString(),
    };
  },
  {
    revalidate,
    cacheKey: "fetchTokens",
  }
);

export const fetchTokens = cache(async () => _fetchTokens(), ["fetchTokens"], {
  revalidate,
});
