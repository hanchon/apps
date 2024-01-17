import { queryOptions } from "@tanstack/react-query";

import { ms } from "helpers/src/time";
import { trpc } from "../../../client";

export const TokensQueryOptions = () =>
  queryOptions({
    queryKey: ["Tokens"],
    staleTime: ms("1d"),
    queryFn: () => trpc.tokens.query(),
  });
