"use server";

import { EvmosRedIcon, PriceDown, PriceUp } from "icons";
import { fetchTokenPrice } from "./fetchTokenPrice";
export const EvmosPrice = async () => {
  const token = await fetchTokenPrice("evmos");
  if (!token) throw new Error("Token not found");
  const priceChange = token.usd24hChange ?? 0;
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
