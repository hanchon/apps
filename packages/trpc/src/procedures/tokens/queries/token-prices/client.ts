import { queryOptions } from "@tanstack/react-query";
import { trpc } from "../../../../client";

import { ms } from "helpers/src/time";

export const TokenPricesQueryOptions = () =>
  queryOptions({
    queryKey: ["TokenPrices"],
    staleTime: ms("5m"),
    queryFn: () => trpc.tokenPrices.query(),
  });
