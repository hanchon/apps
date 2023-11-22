"use client";
import { EvmosRedIcon, PriceDown, PriceUp } from "icons";

import { cn } from "helpers";
import { useAssets } from "@evmosapps/evmos-wallet";

export const EvmosPrice = () => {
  const { evmosPriceFixed, evmosPriceChange, error } = useAssets();

  if (error) return null;
  const ready = evmosPriceFixed && evmosPriceChange;
  return (
    <div className="text-pearl bg-darGray800 cursor-default items-center justify-center gap-3 rounded-full px-4 py-2 font-bold flex lg:mr-8">
      <EvmosRedIcon width={"1.4em"} height={"1.4em"} />
      <div
        className={cn("flex gap-3 items-center", {
          "w-[13ch] h-[1lh] bg-gray2/20 rounded-md animate-pulse ": !ready,
        })}
      >
        {evmosPriceFixed && evmosPriceChange && (
          <>
            <span>{evmosPriceFixed}</span>

            <div className="flex items-center gap-1">
              {evmosPriceChange >= 0 ? <PriceUp /> : <PriceDown />}
              <span
                className={
                  evmosPriceChange > 0 ? "text-[#31B886]" : "text-[#ED4E33]"
                }
              >
                {evmosPriceChange.toFixed(2)}%
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
