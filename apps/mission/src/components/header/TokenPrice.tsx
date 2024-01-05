"use client";
import { EvmosRedIcon, PriceDown, PriceUp } from "icons";
import { fetchTokenPriceByDenom } from "@evmosapps/evmos-wallet/src/server/fetch-token-price-by-denom";

import { cn } from "helpers";
import { useQuery } from "@tanstack/react-query";
const formatFiat = (value: number) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
export const EvmosPrice = () => {
  const { error, data, status } = useQuery({
    queryKey: ["evmosPrice"],
    refetchOnWindowFocus: true,
    queryFn: () => {
      return fetchTokenPriceByDenom("EVMOS");
    },
    refetchInterval: 1000 * 60 * 5,
  });

  if (error) return null;
  return (
    <div className="text-pearl bg-darGray800 cursor-default items-center justify-center gap-3 rounded-full px-4 py-2 font-bold flex lg:mr-8">
      <EvmosRedIcon width={"1em"} height={"1em"} />
      <div
        className={cn("flex gap-3 items-center", {
          "w-[13ch] h-[1lh] bg-gray2/20 rounded-md animate-pulse ":
            status === "pending",
        })}
      >
        {data && (
          <>
            <span>{formatFiat(data.price.usd)}</span>

            <div className="flex items-center gap-1">
              {data.price.usd24hChange >= 0 ? <PriceUp /> : <PriceDown />}
              <span
                className={
                  data.price.usd24hChange > 0
                    ? "text-[#31B886]"
                    : "text-[#ED4E33]"
                }
              >
                {data.price.usd24hChange.toFixed(2)}%
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
