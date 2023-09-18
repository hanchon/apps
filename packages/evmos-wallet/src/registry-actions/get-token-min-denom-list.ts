import { getTokens } from "./get-tokens";
import { TokenMinDenom } from "./types";

export function getTokenMinDenomList(): TokenMinDenom[] {
  return getTokens().map(({ minCoinDenom }) => minCoinDenom);
}
