import { chains } from "@evmos-apps/registry";
import { Chain, Prefix, Token, TokenMinDenom } from "./types";
export function getToken<T extends Prefix>(
  prefix: T,
  token: Extract<Chain, { prefix: T }>["tokens"][number]["minCoinDenom"],
): Token;
export function getToken<T extends string>(
  prefix: T,
  token: TokenMinDenom | (string & {}),
): Token | null;
export function getToken<T extends Prefix>(
  prefix: T,
  token: string,
): Token | null {
  return chains[prefix]?.tokens.find((t) => t.minCoinDenom === token) ?? null;
}
