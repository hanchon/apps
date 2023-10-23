import { chains } from "@evmosapps/registry";
import { TokenByDenom, TokenDenom } from "./types";

export const TOKENS_BY_DENOM = Object.values(chains).reduce((acc, chain) => {
  for (const token of chain.tokens) {
    Object.assign(acc, { [token.denom]: token });
  }
  return acc;
}, {} as TokenByDenom);

export const getTokenByDenom = <T extends TokenDenom>(denom: T) => {
  return TOKENS_BY_DENOM[denom];
};
