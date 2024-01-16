import { queryOptions } from "@tanstack/react-query";
import { fetchChains } from "@evmosapps/registry/src/fetch-chains";
import { trpc } from "@evmosapps/trpc/client";

export const AllChainsQueryOptions = () =>
  queryOptions({
    staleTime: Infinity,
    queryKey: ["AllChains"],
    queryFn: () => trpc.chains.query(),
  });
