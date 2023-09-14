import { chains } from "@evmos-apps/registry";
import {
  Token,
  TokenByMinDenom,
  TokenByRef,
  TokenMinDenom,
  TokenRef,
} from "./types";
import { isObject } from "helpers";

export const TOKENS_BY_REF = Object.values(chains).reduce((acc, chain) => {
  for (const token of chain.currencies) {
    Object.assign(acc, { [`${chain.prefix}:${token.minCoinDenom}`]: token });
  }
  return acc;
}, {} as TokenByRef);

export function getTokenByRef<T extends keyof TokenByRef>(
  denom: T
): TokenByRef[T];
export function getTokenByRef<T extends string>(denom: T): Token | null;
export function getTokenByRef<T extends string>(denom: T): Token | null {
  return denom in TOKENS_BY_REF ? TOKENS_BY_REF[denom as TokenRef] : null;
}
