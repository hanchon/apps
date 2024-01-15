"use client";
import { PriceDownIcon } from "@evmosapps/icons/PriceDownIcon";
import { PriceUpIcon } from "@evmosapps/icons/PriceUpIcon";
import { TokenPriceQueryOptions } from "@evmosapps/evmos-wallet/src/queries/token-price-query";
import { assert, raise } from "helpers";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const PriceDisplay = () => {
  const { data } = useQuery(TokenPriceQueryOptions("EVMOS"));

  if (!data) {
    return (
      <div className="w-[13ch] h-[1lh] bg-gray2/20 rounded-md animate-pulse" />
    );
  }

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
