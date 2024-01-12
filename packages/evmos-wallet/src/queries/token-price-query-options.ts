import { queryOptions } from "@tanstack/react-query";
import { AllTokenPricesQueryOptions } from "./all-token-prices-query";

export const TokenPriceQueryOptions = (denom: string) => {
  return queryOptions({
    ...AllTokenPricesQueryOptions(),
    select: (prices) =>
      prices.find((p) => p.coinDenoms.includes(denom)) || null,
  });
};
