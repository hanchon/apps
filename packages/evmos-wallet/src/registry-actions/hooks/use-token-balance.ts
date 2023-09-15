import { Address } from "../../wallet";
import { Prefix, TokenMinDenom } from "../types";
import { useAccountBalances } from "./use-account-balances";

export const useTokenBalance = (
  address?: Address<Prefix>,
  token?: {
    minCoinDenom: TokenMinDenom;
    sourcePrefix: Prefix;
  }
) => {
  const { data, ...rest } = useAccountBalances(address);
  const balance =
    data && token
      ? data.find(({ minDenom, type }) => {
          if (token.minCoinDenom === "aevmos") {
            return minDenom === token.minCoinDenom && type === "ICS20";
          }
          return minDenom === token.minCoinDenom;
        })
      : undefined;

  return {
    ...rest,
    balance,
  };
};
