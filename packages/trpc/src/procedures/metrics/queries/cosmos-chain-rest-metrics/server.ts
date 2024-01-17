import { fetchChainByRef } from "../../../chains/queries/chain-by-ref/server";
import { cosmos } from "helpers/src/clients/cosmos";
import { assert } from "helpers";
import { rankApis } from "../../../utils/rank-apis";
import { nextCache } from "helpers/src/next/cache";
import { seconds } from "helpers/src/time";
export const fetchChainCosmosRestMetrics = nextCache(
  async (chain: string) => {
    const chainConfig = await fetchChainByRef(chain);
    const urls = chainConfig?.rest;

    assert(urls && urls.length, "No rest endpoints found");

    const results = await rankApis(urls, async (url, time) => {
      const signal = AbortSignal.timeout(8_000);
      /** Gravity bridge does not expose the tendermint module so we use a different endpoint to test it */
      if (chain === "gravitybridge") {
        const resp = await time(() =>
          cosmos(chain, {
            baseUrl: url,
          }).GET("/cosmos/bank/v1beta1/supply", {
            signal,
          })
        );
        if (resp.response.status >= 200 && resp.response.status < 300) {
          return { height: Infinity };
        }
      }
      const resp = await time(() =>
        cosmos(chain, {
          baseUrl: url,
        }).GET("/cosmos/base/tendermint/v1beta1/blocks/latest", {
          signal,
        })
      );
      const height = resp.data?.block?.header?.height ?? null;
      if (height === null) {
        throw new Error("height is null");
      }
      return { height: parseInt(height) };
    });
    return {
      results,
      dt: new Date().toISOString(),
    };
  },
  ["fetchChainCosmosRestMetrics"],
  {
    revalidate: seconds("10m"),
    tags: ["api-metrics", "cosmos-rest-metrics"],
  }
);
