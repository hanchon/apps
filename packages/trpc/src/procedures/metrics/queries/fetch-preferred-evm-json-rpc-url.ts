import { nextCache } from "helpers/src/next/cache";
import { assert } from "helpers";
import { fetchEVMJsonRpcMetrics } from "./fetch-evm-json-rpc-metrics";
import { seconds } from "helpers/src/time";

export const fetchPreferredEvmJsonRpcUrl = nextCache(
  async (chain: string) => {
    const { results } = await fetchEVMJsonRpcMetrics(chain);

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
  ["fetchPreferredEvmJsonRpcUrl"],
  {
    revalidate: seconds("10m"),
  }
);
