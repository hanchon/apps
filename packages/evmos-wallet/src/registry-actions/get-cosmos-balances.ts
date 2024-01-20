// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { makeBalance } from "./utils/make-balance";
import { FormattedBalance } from "./types";

import { apiCosmosBalance } from "../api/cosmos-rest";
import { IBC_DENOMS_MAP } from "./utils";
import { getToken } from "./get-token";
import { getChain } from "./get-chain";
import { CosmosAddress } from "helpers/src/crypto/addresses/types";
import { getPrefix } from "helpers/src/crypto/addresses/get-prefix";

export async function getCosmosBalances({
  address,
}: {
  address: CosmosAddress;
}) {
  const prefix = getPrefix(address);
  const chain = getChain(prefix);

  const response = await apiCosmosBalance(chain.cosmosRest, address);
  const balances: FormattedBalance[] = [];

  for (const { denom, amount } of response.balances) {
    if (denom in IBC_DENOMS_MAP) {
      const token = IBC_DENOMS_MAP[denom];
      if (!token) continue;
      balances.push(makeBalance(token, address, amount, "ICS20"));
      continue;
    }
    const token = getToken(prefix, denom);
    // Token is not in our registry so we ignore it
    if (!token) continue;
    balances.push(makeBalance(token, address, amount, "ICS20"));
  }

  return balances;
}
