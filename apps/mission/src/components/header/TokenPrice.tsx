"use server";

import { getTokens } from "evmos-wallet/src/registry-actions/get-tokens";
import { EvmosRedIcon, PriceDown, PriceUp } from "icons";
import { ComponentProps, cache } from "react";
import { z } from "zod";
const fetchTokensOfInterest = cache(async (reference = "usd") => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${getTokens()
      .map(({ coingeckoId }) => coingeckoId)
      .filter(Boolean)
      .join(
        ","
      )}&vs_currencies=${reference}&include_24hr_change=true&include_last_updated_at=true`,
    {
      next: {
        revalidate: 15 * 60,
      },
    }
  );

  const data = await response.json();

  return Object.fromEntries(
    Object.entries(
      z
        .record(
          z.object({
            usd: z.number().optional(),
            usd_24h_change: z.number().optional(),
            last_updated_at: z.number().optional(),
          })
        )
        .parse(data)
    ).filter(
      ([, { usd, last_updated_at, usd_24h_change }]) =>
        typeof usd === "number" &&
        typeof last_updated_at === "number" &&
        typeof usd_24h_change === "number"
    )
  );
});
const fetchTokenStats = (id: string) =>
  fetchTokensOfInterest().then((tokens) => tokens[id]);

export const EvmosPrice = async () => {
  const token = await fetchTokenStats("evmos");
  if (!token) throw new Error("Token not found");
  const priceChange = token.usd_24h_change ?? 0;
  return (
    <div className="text-pearl bg-darGray800 cursor-default items-center justify-center space-x-3 rounded-full px-4 py-2 font-bold flex lg:mr-8">
      <EvmosRedIcon width={"1.4em"} height={"1.4em"} />
      <span>${token.usd?.toFixed(2) ?? "0.00"}</span>
      <div className="flex items-center gap-1">
        {priceChange >= 0 ? <PriceUp /> : <PriceDown />}
        <span
          className={`${priceChange > 0 ? "text-[#31B886]" : "text-[#ED4E33]"}`}
        >
          {priceChange.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};
