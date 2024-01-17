import { fetchChainByRef } from "../../../chains/queries/chain-by-ref/server";
import { assert, raise } from "helpers";
import { Hex, fromHex } from "viem";
import { rankApis } from "../../../utils/rank-apis";
import { nextCache } from "helpers/src/next/cache";
import { seconds } from "helpers/src/time";
export const fetchEVMJsonRpcMetrics = nextCache(
  async (chain: string) => {
    const chainConfig = await fetchChainByRef(chain);
    const urls = chainConfig?.web3;
    assert(urls && urls.length, "No rest endpoints found");

    const results = await rankApis(urls, async (url, time) => {
      const signal = AbortSignal.timeout(5000);
      const resp = await time(() =>
        fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_blockNumber",
            params: [],
            id: 1,
          }),
          signal,
        })
      );
      if (resp.status < 200 && resp.status >= 300) {
        throw new Error("Invalid status code");
      }
      const json = (await resp.json()) as {
        result: string;
      };

      return {
        height: fromHex(
          (json.result as Hex) ?? raise("Height not set"),
          "number"
        ),
      };
    });
    return {
      results,
      dt: new Date().toISOString(),
    };
  },
  ["fetchEVMJsonRpcMetrics"],
  {
    revalidate: seconds("10m"),
    tags: ["api-metrics", "evm-json-rpc-metrics"],
  }
);
