// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Token } from "./types";
import { getChain } from "./get-chain";

export function getToken(prefix: string, token: string): Token | null {
  return (
    getChain(prefix)?.tokens.find(
      (t) => t.minCoinDenom === token || t.sourceDenom === token,
    ) ?? null
  );
}
