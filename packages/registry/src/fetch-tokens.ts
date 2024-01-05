"use server";
import { devModeCache } from "helpers/src/dev/dev-mode-cache";

import { TokenEntity } from "../autogen/token-entity";
import { github } from "helpers/src/clients/github";
import { loadRegistryTokenExtensions } from "./load-registry-token-extensions";
import { unstable_cache } from "next/cache";

const revalidate = 3600;
const _fetchTokens = devModeCache(
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
    return (await Promise.all([fromRegistry, fromExtensions]))
      .flatMap((x) => x)
      .map((token) => ({
        ...token,
        source: token.ibc.source!,
      }));
  },

  {
    revalidate,
    cacheKey: "fetchTokens",
  }
);

export const fetchTokens = unstable_cache(_fetchTokens, ["fetchTokens"], {
  revalidate,
});
