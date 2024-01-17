import { queryOptions } from "@tanstack/react-query";

import { raise } from "helpers";
import { ms } from "helpers/src/time";
import { TokenDenom } from "../../../../../autogen/registry";
import { trpc } from "../../../../client";

export const TokenByDenomQueryOptions = (denom?: TokenDenom) =>
  queryOptions({
    queryKey: ["TokenByDenom", denom],
    staleTime: ms("1d"),
    queryFn: () =>
      trpc.tokenByDenom.query(denom ?? raise("'denom' is required")),
  });
