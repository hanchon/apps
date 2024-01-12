import { queryOptions } from "@tanstack/react-query";
// import { fetchToken } from "../server/fetch-token.server";
// import { raise } from "helpers";

export const CosmosQueryOptions = (denom?: string) =>
  queryOptions({
    staleTime: Infinity,
    queryKey: ["token", denom],
    // queryFn: () => cosmos,
    enabled: !!denom,
  });
