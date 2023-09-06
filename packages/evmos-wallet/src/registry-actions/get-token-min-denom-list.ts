import { TokenMinDenom } from "./types";
import { TOKENS_BY_MIN_DENOM } from "./get-token-by-min-denom";

export function getTokenMinDenomList() {
  return Object.keys(TOKENS_BY_MIN_DENOM) as TokenMinDenom[];
}
