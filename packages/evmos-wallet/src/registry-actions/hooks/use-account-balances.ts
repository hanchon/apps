import { useQuery } from "@tanstack/react-query";
import { Address } from "../../wallet";
import { getAccountBalances } from "../get-account-balances";
import { Prefix } from "../types";

export const useAccountBalances = (address?: Address<Prefix>) => {
  return useQuery({
    queryKey: ["accountBalances", address],
    refetchInterval: 1000 * 60,
    queryFn: () => {
      if (!address) return [];
      return getAccountBalances({ address });
    },
    enabled: !!address,
  });
};
