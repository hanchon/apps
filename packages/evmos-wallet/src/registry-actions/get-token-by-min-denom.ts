import { chains } from "@evmos-apps/registry";
import { Token, TokenByMinDenom, TokenMinDenom } from "./types";

export const TOKENS_BY_MIN_DENOM = Object.values(chains).reduce(
  (acc, chain) => {
    for (const token of chain.currencies) {
      Object.assign(acc, { [token.minCoinDenom]: token });
    }
    return acc;
  },
  {} as TokenByMinDenom
);

export function getTokenByMinDenom<T extends TokenMinDenom>(
  denom: T
): TokenByMinDenom[T];
export function getTokenByMinDenom<T extends string>(denom: T): Token | null;
export function getTokenByMinDenom<T extends string>(denom: T): Token | null {
  return denom in TOKENS_BY_MIN_DENOM
    ? TOKENS_BY_MIN_DENOM[denom as TokenMinDenom]
    : null;
}
