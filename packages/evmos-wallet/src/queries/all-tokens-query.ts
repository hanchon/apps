import { queryOptions } from "@tanstack/react-query";
import { fetchTokens } from "@evmosapps/registry/src/fetch-tokens";

export const AllTokenQueryOptions = () =>
  queryOptions({
    staleTime: Infinity,
    queryKey: ["AllTokens"],
    queryFn: async () => {
      const { tokens } = await fetchTokens();
      return tokens;
    },
  });
