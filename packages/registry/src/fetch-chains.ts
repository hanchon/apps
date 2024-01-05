"use server";
import { devModeCache } from "helpers/src/dev/dev-mode-cache";
import { github } from "helpers/src/clients/github";
import { ChainEntity } from "../autogen/chain-entity";
import { loadRegistryChainExtensions } from "./load-registry-chain-extensions";

const revalidate = 3600;
export const fetchChains = devModeCache(
  async function fetchChains() {
    const fromRegistry = github
      .request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
        owner: "evmos",
        repo: "chain-token-registry",
        tree_sha: "cd4267bb8f6d9b3018a1f795382fc0114d5816e0",
      })

      .then((res) =>
        res.data.tree.filter((token) => token.path?.endsWith(".json"))
      )
      .then((tokens) =>
        Promise.all(
          tokens.map((token) =>
            fetch(
              `https://raw.githubusercontent.com/evmos/chain-token-registry/main/chainConfig/${token.path}`
            ).then((res) => res.json() as Promise<ChainEntity>)
          )
        )
      );
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
    return flattened;
  },
  {
    cacheKey: "fetchChains",
    revalidate,
  }
);
