import { chains } from "@evmos-apps/registry";
import {
  Chain,
  Prefix,
  Token,
  TokenByMinDenom,
  TokenByRef,
  TokenMinDenom,
  TokenRef,
} from "./types";
import { isObject } from "helpers";
export function getToken<T extends Prefix>(
  prefix: T,
  token: Extract<Chain, { prefix: T }>["currencies"][number]["minCoinDenom"]
): Token;
export function getToken<T extends string>(
  prefix: T,
  token: TokenMinDenom | (string & {})
): Token | null;
export function getToken<T extends Prefix>(
  prefix: T,
  token: string
): Token | null {
  return (
    chains[prefix].currencies.find((t) => t.minCoinDenom === token) ?? null
  );
}
