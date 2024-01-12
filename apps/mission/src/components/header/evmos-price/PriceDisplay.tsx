"use client";
import { PriceDownIcon } from "@evmosapps/icons/PriceDownIcon";
import { PriceUpIcon } from "@evmosapps/icons/PriceUpIcon";
import { TokenPriceQueryOptions } from "@evmosapps/evmos-wallet/src/queries/token-price-query-options";
import { assert, raise } from "helpers";
import { useSuspenseQuery } from "@tanstack/react-query";

export const PriceDisplay = () => {
  const { data = raise("Evmos Price not found") } = useSuspenseQuery(
    TokenPriceQueryOptions("EVMOS")
  );
  assert(data, "Evmos Price not found");
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
