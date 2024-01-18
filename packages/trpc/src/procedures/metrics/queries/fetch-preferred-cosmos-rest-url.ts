import { nextCache } from "helpers/src/next/cache";
import { assert } from "helpers";
import { fetchChainCosmosRestMetrics } from "./fetch-cosmos-chain-rest-metrics";
import { seconds } from "helpers/src/time";

export const fetchPreferredCosmosRestUrl = nextCache(
  async (chain: string) => {
    const { results } = await fetchChainCosmosRestMetrics(chain);

    const [best, ...others] = results.flatMap(({ url, error }) => {
      if (error || !url) {
        return [];
      }
      return [url];
    });
    assert(best, "No metrics found");
    return {
      preferred: best,
      urls: [best, ...others] as [string, ...string[]],
    };
  },
  ["fetchPreferredCosmosRestUrl"],
  {
    revalidate: seconds("10m"),
  }
);
