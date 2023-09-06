import { chains } from "@evmos-apps/registry";
import { Prefix } from "../types";
import { getTokenByDenom } from "../get-token-by-denom";
import { toIBCDenom } from "helpers";

export const getIBCDenomOnNetwork = (
  /**
   * network prefix holding Evmos native asset
   */
  network: Prefix,
  /**
   * denom of the token
   */
  denom: (typeof chains.evmos.currencies)[number]["denom"] = "EVMOS"
) => {
  const token = getTokenByDenom(denom);
  if (network === "evmos") {
    return token.minCoinDenom;
  }
  const chain = chains[network];
  return toIBCDenom("transfer", chain.source.sourceChannel, token.cosmosDenom);
};
