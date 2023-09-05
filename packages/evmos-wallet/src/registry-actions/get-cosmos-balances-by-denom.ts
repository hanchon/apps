import { CosmosAddress } from "../wallet";
import { makeBalance } from "./utils/make-balance";
import { Prefix, TokenDenom } from "./types";
import { getTokenByDenom } from "./get-token-by-denom";
import { chains } from "@evmos-apps/registry";
import { getPrefix } from "../wallet/utils";
import { apiCosmosBalanceByDenom } from "../api";

export async function getCosmosBalancesByDenom<TPrefix extends Prefix>({
  address,
  denom,
}: {
  address: CosmosAddress<TPrefix>;
  denom: TokenDenom;
}) {
  const prefix = getPrefix(address);
  const token = getTokenByDenom(denom);
  const chain = chains[prefix];
  const minDenom =
    token.denom === "EVMOS" && chain.prefix !== "evmos"
      ? chain.source.sourceIBCDenomToEvmos
      : token.minCoinDenom;

  const response = await apiCosmosBalanceByDenom(
    chain.cosmosRest.http,
    address,
    minDenom
  );
  return makeBalance(denom, address, response.balance.amount, "ICS20");
}
