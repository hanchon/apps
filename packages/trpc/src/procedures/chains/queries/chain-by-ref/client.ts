import { queryOptions } from "@tanstack/react-query";

import { raise } from "helpers";
import { ms } from "helpers/src/time";
import { trpc } from "../../../../client";
import { ChainRef } from "../../../../../autogen/registry";

export const ChainByRefQueryOptions = (chainRef?: ChainRef) =>
  queryOptions({
    queryKey: ["ChainByRef", chainRef],
    staleTime: ms("1d"),
    queryFn: () =>
      trpc.chainByRef.query(chainRef ?? raise("'chainRef' is required")),
    enabled: !!chainRef,
  });
