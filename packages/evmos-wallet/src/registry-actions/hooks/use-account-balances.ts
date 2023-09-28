import { useQuery } from "@tanstack/react-query";
import { Address } from "../../wallet";
import { getAccountBalances } from "../get-account-balances";
import { Prefix } from "../types";
import { useAccountExists } from "./use-account-exists";

export const useAccountBalances = (address?: Address<Prefix>) => {
  const { data: accountExists } = useAccountExists(address);
  return useQuery({
    queryKey: ["accountBalances", address],
    refetchInterval: 1000 * 60,
    queryFn: () => {
      if (!address) return [];

      return getAccountBalances({ address });
    },
    enabled: !!address && accountExists,
  });
};
