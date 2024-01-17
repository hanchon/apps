import { queryOptions } from "@tanstack/react-query";
import { trpc } from "../../../client";
import { raise } from "helpers";
import { Address } from "helpers/src/crypto/addresses/types";
import { ms } from "helpers/src/time";

export const AccountBalancesQueryOptions = ({
  chain,
  address,
}: {
  chain?: string;
  address?: Address;
}) =>
  queryOptions({
    queryKey: ["AccountBalances", chain, address],
    staleTime: ms("5s"),
    queryFn: () =>
      trpc.accountBalance.query({
        chain: chain ?? raise("'chain' is required"),
        address: address ?? raise("'address' is required"),
      }),
    enabled: !!chain && !!address,
  });
