import { queryOptions } from "@tanstack/react-query";
import { trpc } from "../../../../client";
import { raise } from "helpers";
import { ms } from "helpers/src/time";
import { TokenDenom } from "../../../../../autogen/registry";

export const TokenPriceByDenomQueryOptions = (denom?: TokenDenom) =>
  queryOptions({
    queryKey: ["TokenPriceByDenom", denom],
    staleTime: ms("5m"),
    queryFn: () => trpc.tokenPriceByDenom.query(denom ?? raise("")),
    enabled: !!denom,
  });
