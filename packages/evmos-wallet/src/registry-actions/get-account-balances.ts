// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { FormattedBalance } from "./types";

import { isHex } from "viem";
import { getERC20TokenBalances } from "./get-erc20-token-balances";
import { getCosmosBalances } from "./get-cosmos-balances";
import { isEvmosAddress } from "helpers/src/crypto/addresses/is-evmos-address";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { Address } from "helpers/src/crypto/addresses/types";

export const getAccountBalances = async ({ address }: { address: Address }) => {
  const addressAsCosmos = isHex(address) ? normalizeToCosmos(address) : address;
  const balances = await getCosmosBalances({ address: addressAsCosmos });
  if (!isEvmosAddress(address)) {
    return balances;
  }

  return sortEmptyBalanceLast([
    ...balances,
    ...(await getERC20TokenBalances({
      address: normalizeToCosmos(address),
    })),
  ]);
};

const sortEmptyBalanceLast = (balances: FormattedBalance[]) => {
  return balances.sort((a, b) => {
    return b.value === 0n ? 1 : -1;
  });
};
