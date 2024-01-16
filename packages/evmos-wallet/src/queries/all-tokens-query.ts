import { queryOptions } from "@tanstack/react-query";
import { fetchTokens } from "@evmosapps/registry/src/fetch-tokens";
import { trpc } from "@evmosapps/trpc/client";

export const AllTokenQueryOptions = () =>
  queryOptions({
    staleTime: Infinity,
    queryKey: ["AllTokens"],
    queryFn: () => trpc.tokens.query(),
  });
