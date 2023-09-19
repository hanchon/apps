import { chains } from "@evmos-apps/registry";
import { Chain, Prefix, Token, TokenByRef, TokenRef } from "./types";

const TOKEN_BY_REF = Object.fromEntries(
  Object.entries(chains).flatMap(([chainId, chain]) =>
    chain.tokens.map((token) => [token.ref, token])
  )
) as TokenByRef;

export function getTokenByRef<T extends TokenRef>(ref: T): TokenByRef[T];
export function getTokenByRef(ref: string): Token | null;
export function getTokenByRef(ref: string): Token | null {
  return TOKEN_BY_REF[ref as keyof TokenByRef] ?? null;
}
