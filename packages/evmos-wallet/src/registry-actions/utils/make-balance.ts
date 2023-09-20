import { CosmosAddress } from "../../wallet";
import { FormattedBalance, Token, TokenDenom } from "../types";
import { formatUnits } from "./format-units";

export const makeBalance = (
  token: Token,
  address: CosmosAddress,
  value: string | bigint,
  type: "ICS20" | "ERC20",
): FormattedBalance => {
  const amount = BigInt(value);

  return {
    address,
    decimals: token.decimals,
    formatted: formatUnits(amount, token.decimals, "short"),
    formattedLong: formatUnits(amount, token.decimals, "long"),
    tokenSourcePrefix: token.sourcePrefix,
    symbol: token.symbol,
    tokenRef: token.ref,
    denom: token.denom,
    minDenom: token.minCoinDenom,
    value: amount,
    type,
  };
};
