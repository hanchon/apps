import { CosmosAddress } from "../wallet";
import { makeBalance } from "./utils/make-balance";
import { FormattedBalance, Prefix } from "./types";
import { chains } from "@evmos-apps/registry";
import { getPrefix } from "../wallet/utils";
import { apiCosmosBalance } from "../api/cosmos-rest";
import { getTokenByMinDenom } from "./get-token-by-min-denom";
import { getIBCDenomOnNetwork } from "./utils";

export async function getCosmosBalances({
  address,
}: {
  address: CosmosAddress<Prefix>;
}) {
  const prefix = getPrefix(address);
  const chain = chains[prefix];

  const response = await apiCosmosBalance(chain.cosmosRest.http, address);
  const balances: FormattedBalance[] = [];

  /**
   * These are the tokens native to the EVMOS chain
   *
   * Their IBC denom will show up differently on other chains
   * It will look like this: ibc/HASH
   * And the hash will be different for each chain that holds evmos assets
   *
   * This creates a map of all evmos denoms to their token object
   * so we know which token is which
   *
   * learn more about IBC denoms here: https://tutorials.cosmos.network/tutorials/6-ibc-dev/
   */
  const evmosTokensIBCDenomsMap = Object.fromEntries(
    chains.evmos.currencies.map((token) => [
      getIBCDenomOnNetwork(prefix, token.denom),
      token,
    ])
  );

  for (const { denom, amount } of response.balances) {
    if (denom in evmosTokensIBCDenomsMap) {
      const token = evmosTokensIBCDenomsMap[denom];
      balances.push(makeBalance(token.denom, address, amount, "ICS20"));
      continue;
    }
    const token = getTokenByMinDenom(denom);
    // Token is not in our registry so we ignore it
    if (!token) continue;
    balances.push(makeBalance(token.denom, address, amount, "ICS20"));
  }

  return balances;
}
