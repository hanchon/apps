"use server";
import { fetchTokens } from "@evmosapps/registry/src/fetch-tokens";
import { isUndefined } from "helpers";
import { cachedFetch } from "helpers/src/dev/cached-fetch";
import { formatFiat } from "helpers/src/format/format-fiat";
import { z } from "zod";

const revalidate = 5 * 60; // 5 minutes

type CoingeckoTokenPriceResponse<C extends string> = {
  [x in C | `${C}_24h_change` | "last_updated_at"]?: number;
};
type CoingeckoResponse<T extends string, C extends string> = string extends T
  ? Record<string, CoingeckoTokenPriceResponse<C>>
  : {
      [K in T]: CoingeckoTokenPriceResponse<C>;
    };

const fetchCoinGeckoTokenPrices = async function <
  const T extends string,
  const C extends string,
>(coingeckoIds: T[], currencies?: C[]) {
  const url = new URL("https://api.coingecko.com/api/v3/simple/price");
  url.searchParams.set("include_24hr_change", "true");
  url.searchParams.set("include_last_updated_at", "true");
  url.searchParams.set("vs_currencies", currencies?.join(",") ?? "usd");

  url.searchParams.set("ids", coingeckoIds.join(","));

  return (await cachedFetch(url, {
    next: {
      revalidate,
      tags: ["coingecko-token-prices"],
    },
    devCache: {
      revalidate,
      tags: ["coingecko-token-prices"],
    },
  })
    .then((res) => res.json() as Promise<unknown>)
    .then((tokenPrices) => tokenPrices)) as Promise<CoingeckoResponse<T, C>>;
};
const fetchStevmosRedemptionRate = async () => {
  const resp = await fetch(
    "https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone/evmos_9001-2",
    {
      next: {
        revalidate,
        tags: ["stride-redemption-rate"],
      },
    }
  ).then((res) => res.json());
  return z
    .object({
      host_zone: z.object({
        redemption_rate: z.coerce.number(),
      }),
    })
    .transform((data) => data.host_zone.redemption_rate)
    .parse(resp);
};
export const fetchTokenPrices = async () => {
  const url = new URL("https://api.coingecko.com/api/v3/simple/price");
  url.searchParams.set("include_24hr_change", "true");
  url.searchParams.set("include_last_updated_at", "true");
  url.searchParams.set("vs_currencies", "usd");
  const { tokens } = await fetchTokens();

  const coingeckoIds = [
    ...tokens.reduce((acc, token) => {
      if (token.coingeckoId) acc.add(token.coingeckoId);
      return acc;
    }, new Set<string>()),
  ];

  url.searchParams.set("ids", coingeckoIds.join(","));
  const coingeckoPrices = await fetchCoinGeckoTokenPrices(coingeckoIds, [
    "usd",
  ]);

  const prices = Object.entries(coingeckoPrices).reduce<
    {
      usd: {
        price: number;
        priceChange: number;
        formattedPrice: string;
        formattedPriceChange: string;
      };
      lastUpdatedAt: string;
      coingeckoId: string;
      coinDenoms: string[];
    }[]
  >((acc, [coingeckoId, { usd, usd_24h_change, last_updated_at }]) => {
    if (
      isUndefined(usd) ||
      isUndefined(usd_24h_change) ||
      isUndefined(last_updated_at)
    ) {
      return acc;
    }

    acc.push({
      usd: {
        price: usd,
        priceChange: usd_24h_change,
        formattedPrice: formatFiat(usd),
        formattedPriceChange: `${usd_24h_change.toFixed(2)}%`,
      },
      lastUpdatedAt: new Date(last_updated_at * 1000).toISOString(),
      coingeckoId,
      coinDenoms: tokens
        .filter((token) => token.coingeckoId === coingeckoId)
        .map((token) => token.coinDenom),
    });

    return acc;
  }, []);

  const evmos = prices.find((price) => price.coinDenoms.includes("EVMOS"));
  if (evmos) {
    const stevmosRedemptionRate = await fetchStevmosRedemptionRate();

    prices.push({
      ...evmos,

      coinDenoms: ["stEVMOS"],
      coingeckoId: "stride-staked-evmos",
      usd: {
        ...evmos.usd,
        price: evmos.usd.price / stevmosRedemptionRate,
        formattedPrice: formatFiat(evmos.usd.price / stevmosRedemptionRate),
      },
    });
  }

  return prices;
};
