import { chains } from "@evmos-apps/registry";
import { TokenMinDenom } from "../types";
import { getIBCDenom } from "./get-ibc-denom";
import { getTokens } from "../get-tokens";

const ibcDenomsMap: Record<string, TokenMinDenom> = {};
const { evmos, ...others } = chains;
/**
 * Evmos tokens in other networks
 */
for (const token of evmos.currencies) {
  for (const chain of Object.values(others)) {
    let ibcDenom = getIBCDenom({
      sender: chain.prefix,
      receiver: "evmos",

      minDenom: token.minCoinDenom,
    });
    ibcDenomsMap[ibcDenom] = token.minCoinDenom;
  }
}

/**
 * other networks tokens in Evmos
 */
for (const chain of Object.values(others)) {
  for (const token of chain.currencies) {
    let ibcDenom = getIBCDenom({
      sender: "evmos",
      receiver: chain.prefix,
      minDenom: token.minCoinDenom,
    });
    ibcDenomsMap[ibcDenom] = token.minCoinDenom;
  }
}

export const normalizeToMinDenom = (denom: string) => {
  if (denom.startsWith("ibc/")) {
    return ibcDenomsMap[denom] ?? null;
  }
  const token = getTokens().find(
    ({ minCoinDenom, denom: tokenDenom }) =>
      minCoinDenom === denom || tokenDenom === denom
  );
  return token?.minCoinDenom ?? null;
};
