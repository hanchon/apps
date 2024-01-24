// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchTokenPrices } from "../../tokens/queries/price/fetch-token-prices";
import omit from "lodash-es/omit";
import { raise } from "helpers";
import { fetchTokens } from "../../tokens/queries/fetch-tokens";

export const formatBalance = ({
  token,
  cosmos,
  erc20,
  tokenPrice,
}: {
  token: Awaited<ReturnType<typeof fetchTokens>>[number];
  erc20: bigint;
  cosmos: bigint;
  tokenPrice?: Awaited<ReturnType<typeof fetchTokenPrices>>[number];
}) => {
  const total = cosmos + erc20;
  return {
    denom: token.coinDenom,
    // TODO: token image should be a required field in the registry
    img: token.img?.png ?? raise("token image not found"),
    decimals: token.exponent,
    balance: {
      cosmos,
      erc20,
      total,
    },
    price: tokenPrice ? omit(tokenPrice, ["coinDenoms", "coingeckoId"]) : null,
  } as const;
};
