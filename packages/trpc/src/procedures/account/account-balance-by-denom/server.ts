import { Address } from "helpers/src/crypto/addresses/types";

import { fetchTokenPrices } from "../../tokens/queries/token-prices/server";
import { fetchAccountBalances } from "../account-balances/server";

import { formatBalance } from "../utils/format-balance";

import { fetchTokens } from "../../tokens/queries/server";

export const fetchAccountBalanceByDenom = async ({
  chain,
  denom,
  address,
}: {
  chain: string;
  address: Address;
  denom: string;
}) => {
  const balances = await fetchAccountBalances({ chain, address });

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
