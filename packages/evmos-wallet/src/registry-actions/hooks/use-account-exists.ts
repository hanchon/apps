import { useQuery } from "@tanstack/react-query";
import { Address } from "../../wallet";
import { Prefix } from "../types";
import { E } from "helpers";
import { getAccountInfo } from "../get-account-info";

export const useAccountExists = (address?: Address<Prefix>) => {
  return useQuery({
    queryKey: ["accountExists", address],
    retry: false,
    queryFn: async () => {
      if (!address) return false;
      const [err, response] = await E.try(() => getAccountInfo({ address }));
      if (err) {
        if (E.match.byPattern(err, /NotFound/g)) {
          return false;
        }
      }
      if (!response) return;
      return true;
    },
    enabled: !!address,
  });
};
