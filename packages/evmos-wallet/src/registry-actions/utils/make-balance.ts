import { CosmosAddress } from "../../wallet";
import { getTokenByDenom } from "../get-token-by-denom";
import { FormattedBalance, TokenDenom } from "../types";
import { formatUnits } from "./format-units";

export const makeBalance = (
  denom: TokenDenom,
  address: CosmosAddress,
  value: string | bigint,
  type: "ICS20" | "ERC20"
): FormattedBalance => {
  const amount = BigInt(value);
  const token = getTokenByDenom(denom);

  return {
    address,
    decimals: token.decimals,
    formatted: formatUnits(amount, token.decimals, "short"),
    formattedLong: formatUnits(amount, token.decimals, "long"),
    denom,
    minDenom: token.minCoinDenom,
    value: amount,
    type,
  };
};
