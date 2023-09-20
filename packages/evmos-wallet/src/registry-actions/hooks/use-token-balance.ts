import { useMemo } from "react";
import { Address } from "../../wallet";
import { FormattedBalance, Prefix, TokenMinDenom, TokenRef } from "../types";
import { useAccountBalances } from "./use-account-balances";

export const useTokenBalance = (
  address?: Address<Prefix>,
  tokenRef?: TokenRef,
) => {
  const { data, ...rest } = useAccountBalances(address);

  const balance =
    data && tokenRef
      ? data.find((balance) => {
          if (tokenRef === "evmos:EVMOS") {
            return (
              balance.tokenRef == "evmos:EVMOS" && balance.type === "ICS20"
            );
          }
          return tokenRef === balance.tokenRef;
        })
      : undefined;

  return {
    ...rest,
    balance,
  };
};
