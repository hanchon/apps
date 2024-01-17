import { useQuery } from "@tanstack/react-query";

import { getAccountBalances } from "../get-account-balances";

import { queryOptions } from "@tanstack/react-query";
import { Address } from "helpers/src/crypto/addresses/types";

export const AccountBalancesQueryOptions = (address?: Address) =>
  queryOptions({
    queryKey: ["accountBalances", address],
    refetchInterval: 1000 * 60,
    queryFn: () => {
      if (!address) return [];

      return getAccountBalances({ address });
    },
    enabled: !!address,
  });
export const useAccountBalances = (address?: Address) => {
  // const { data: accountExists } = useAccountExists(address);
  return useQuery(AccountBalancesQueryOptions(address));
};
