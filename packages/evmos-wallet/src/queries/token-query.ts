import { queryOptions } from "@tanstack/react-query";

import { raise } from "helpers";
import { queryClient } from "helpers/src/clients/query";
import { AllTokenQueryOptions } from "./all-tokens-query";

export const TokenQueryOptions = (denom?: string) =>
  queryOptions({
    staleTime: Infinity,
    queryKey: ["token", denom],
    queryFn: async () => {
      if (!denom) raise("Denom is required");
      const tokens = await queryClient.fetchQuery(AllTokenQueryOptions());

      return tokens.find((token) => token.coinDenom === denom);
    },
    enabled: !!denom,
  });
