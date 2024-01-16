import { queryOptions } from "@tanstack/react-query";
import { trpc } from "@evmosapps/trpc/client";

export const AllTokenPricesQueryOptions = () =>
  queryOptions({
    refetchInterval: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    queryKey: ["tokenPrices"],
    queryFn: () => trpc.tokenPrices.query(),
  });
