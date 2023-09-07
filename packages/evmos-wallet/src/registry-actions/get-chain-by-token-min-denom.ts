import { chains } from "@evmos-apps/registry";
import { TokenMinDenom } from "./types";
import { getTokenByMinDenom } from "./get-token-by-min-denom";

export function getChainByTokenDenom<T extends TokenMinDenom>(denom: T) {
  const token = getTokenByMinDenom(denom);
  for (const chain of Object.values(chains)) {
    if (chain.currencies.includes(token as never)) {
      return chain;
    }
  }
  throw new Error(`Could not find chain for token ${denom}`);
}
