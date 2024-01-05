"use server";
import { fetchTokens } from "@evmosapps/registry/src/fetch-tokens";
import { isUndefined } from "helpers";
import { devModeCache } from "helpers/src/dev/dev-mode-cache";
import { cache } from "react";
import { z } from "zod";

const revalidate = 5 * 60 * 1000; // 5 minutes

const CoingeckoPriceSchema = z
  .object({
    usd: z.number().optional(),
    usd_24h_change: z.number().optional(),
  })
  .passthrough();

const CoingeckoPriceResponseSchema = z.record(CoingeckoPriceSchema);
const { entries, fromEntries, keys } = Object;

export const fetchTokenPrices = cache(
  devModeCache(
    async () => {
      const url = new URL("https://api.coingecko.com/api/v3/simple/price");
      url.searchParams.set("include_24hr_change", "true");
      url.searchParams.set("vs_currencies", "usd");

      const tokenByCoingecko = await fetchTokens()
        .then((tokens) =>
          tokens.flatMap((token) => {
            if (
              !token.coingeckoId ||
              token.source.endsWith("testnet") ||
              token.source.endsWith("localnet")
            ) {
              return [];
            }
            return [[token.coingeckoId, token] as const];
          })
        )
        .then((tokens) => fromEntries(tokens));

      url.searchParams.set("ids", keys(tokenByCoingecko).join(","));

      return await fetch(url)
        .then((res) => res.json() as Promise<unknown>)
        .then((tokenPrices) => CoingeckoPriceResponseSchema.parse(tokenPrices))
        .then((tokenPrices) =>
          entries(tokenPrices).flatMap(([id, { usd, usd_24h_change }]) => {
            const token = tokenByCoingecko[id];
            if (!token || isUndefined(usd) || isUndefined(usd_24h_change)) {
              return [];
            }
            return [
              [
                token.coinDenom,
                {
                  price: {
                    usd,
                    usd24hChange: usd_24h_change,
                  },
                  coinDenom: token.coinDenom,
                },
              ] as const,
            ];
          })
        )
        .then((tokenPrices) => fromEntries(tokenPrices));
    },
    {
      cacheKey: "fetchTokenPrices",
      revalidate,
    }
  )
);
