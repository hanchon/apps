import { Token } from "./types";
import { getChain } from "./get-chain";

export function getToken(prefix: string, token: string): Token | null {
  return (
    getChain(prefix)?.tokens.find(
      (t) => t.minCoinDenom === token || t.sourceDenom === token
    ) ?? null
  );
}
