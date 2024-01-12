import { queryOptions } from "@tanstack/react-query";
import { fetchTokenPrices } from "../server/fetch-token-prices.server";

export const AllTokenPricesQueryOptions = () =>
  queryOptions({
    refetchInterval: 5 * 60 * 1000,
    queryKey: ["tokenPrices"],
    queryFn: () => fetchTokenPrices(),
  });
