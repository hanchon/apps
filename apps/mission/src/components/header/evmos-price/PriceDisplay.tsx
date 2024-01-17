"use client";
import { PriceDownIcon } from "@evmosapps/icons/PriceDownIcon";
import { PriceUpIcon } from "@evmosapps/icons/PriceUpIcon";

import { assert } from "helpers";
import { useSuspenseQuery } from "@tanstack/react-query";
import { TokenPriceByDenomQueryOptions } from "@evmosapps/trpc/procedures/tokens/queries/token-price-by-denom/client";
export const PriceDisplay = () => {
  const { data } = useSuspenseQuery(TokenPriceByDenomQueryOptions("EVMOS"));

  assert(data, "Token not found");

  return (
    <>
      <span>{data.usd.formattedPrice}</span>

      <div className="flex items-center gap-1">
        {data.usd.priceChange >= 0 ? <PriceUpIcon /> : <PriceDownIcon />}
        <span
          className={
            data.usd.priceChange > 0 ? "text-[#31B886]" : "text-[#ED4E33]"
          }
        >
          {data.usd.formattedPriceChange}
        </span>
      </div>
    </>
  );
};
