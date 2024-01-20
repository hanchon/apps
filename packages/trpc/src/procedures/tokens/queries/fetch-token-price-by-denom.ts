// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TokenDenom } from "../../../../autogen/registry";
import { fetchTokenPrices } from "./price/fetch-token-prices";

export const fetchTokenPriceByDenom = async (
  denom: TokenDenom | (string & {}),
) => {
  const tokenPrices = await fetchTokenPrices();
  return (
    tokenPrices.find((tokenPrice) => tokenPrice.coinDenoms.includes(denom)) ??
    null
  );
};
