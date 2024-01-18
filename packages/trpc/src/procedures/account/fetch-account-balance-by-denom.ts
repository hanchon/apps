import { Address } from "helpers/src/crypto/addresses/types";

import { fetchTokenPrices } from "../tokens/queries/price/fetch-token-prices";
import { fetchAccountBalances } from "./fetch-account-balances";

import { formatBalance } from "./utils/format-balance";

import { fetchTokens } from "../tokens/queries/fetch-tokens";

export const fetchAccountBalanceByDenom = async ({
  chainRef,
  denom,
  address,
}: {
  chainRef: string;
  address: Address;
  denom: string;
}) => {
  const balances = await fetchAccountBalances({ chainRef: chainRef, address });

  const balance = balances.find((balance) => balance.denom === denom);

  if (balance) return balance;
  const [tokens, tokenPrices] = await Promise.all([
    fetchTokens(),
    fetchTokenPrices(),
  ]);
  const token = tokens.find((token) => token.cosmosDenom === denom);
  if (!token) {
    throw new Error(`Token ${denom} not found`);
  }

  return formatBalance({
    token,
    cosmos: 0n,
    erc20: 0n,
    tokenPrice: tokenPrices.find(
      (tokenPrice) => tokenPrice.coingeckoId === token.coingeckoId
    ),
  });
};
