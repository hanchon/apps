"use server";
import { devModeCache } from "helpers/src/dev/dev-mode-cache";

import { TokenEntity } from "../autogen/token-entity";
import { github } from "helpers/src/clients/github";
import { loadRegistryTokenExtensions } from "./load-registry-token-extensions";
import { raise } from "helpers";
import { ChainType } from "./types";
import { unstable_cache as cache } from "next/cache";

const revalidate = 3600;
export const fetchTokens = devModeCache(
  cache(
    async function fetchTokens() {
      const fromRegistry = github
        .request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
          owner: "evmos",
          repo: "chain-token-registry",
          tree_sha: "3e3f4cabe7891b9bac61b25ee34052eecc44b027",
        })
        .then((res) =>
          res.data.tree.filter((token) => token.path?.endsWith(".json"))
        )
        .then((tokens) =>
          Promise.all(
            tokens.map((token) =>
              fetch(
                `https://raw.githubusercontent.com/evmos/chain-token-registry/main/tokens/${token.path}`
              ).then((res) => res.json() as Promise<TokenEntity>)
            )
          )
        );

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
    ["fetchTokens"],
    {
      revalidate,
    }
  ),

  {
    revalidate,
    cacheKey: "fetchTokens",
  }
);
