import { queryOptions } from "@tanstack/react-query";

import { ms } from "helpers/src/time";
import { trpc } from "../../../client";

export const ChainsQueryOptions = () =>
  queryOptions({
    queryKey: ["Chains"],
    staleTime: ms("1d"),
    queryFn: () => trpc.chains.query(),
  });
