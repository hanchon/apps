import { chains } from "@evmosapps/registry";
import { Token, TokenByRef, TokenRef } from "./types";

const TOKEN_BY_REF = Object.fromEntries(
  Object.values(chains).flatMap((chain) =>
    chain.tokens.map((token) => [token.ref, token])
  )
) as TokenByRef;

export function getTokenByRef<T extends TokenRef>(ref: T): TokenByRef[T];
export function getTokenByRef(ref: string): Token | null;
export function getTokenByRef(ref: string): Token | null {
  return TOKEN_BY_REF[ref as keyof TokenByRef] ?? null;
}
