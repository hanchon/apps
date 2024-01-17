"use server";

import { raise } from "helpers";

import { fetchTokenPrices } from "../../tokens/queries/token-prices/server";
import { fetchChains } from "../../chains/queries/server";
import { fetchTokens } from "../../tokens/queries/server";

export const legacyFetchERC20ModuleBalance = async () => {
  const [registryToken, tokenPrices, chains] = await Promise.all([
    fetchTokens(),
    fetchTokenPrices(),
    fetchChains(),
  ]);
  const chainMap = Object.fromEntries(
    chains.map((chain) => [chain.ref, chain])
  );
  const tokenPriceMap = Object.fromEntries(
    tokenPrices.map((tokenPrice) => [tokenPrice.coingeckoId, tokenPrice])
  );
  const balance = registryToken
    .filter((token) => token.networkType === "mainnet")
    .map((token) => {
      const tokenPrice = tokenPriceMap[token.coingeckoId];
      const chain = chainMap[token.source] ?? raise("chain not found");

      return {
        name: token.name,
        cosmosBalance: "0",
        decimals: String(token.exponent),
        description: token.description,
        erc20Balance: "0",
        symbol: token.coinDenom,
        tokenName: token.coinDenom,
        chainId: chain.chainId,
        chainIdentifier: chain.ref,
        handledByExternalUI: token.handledByExternalUI ?? null,
        coingeckoPrice: String(tokenPrice?.usd.price ?? "0"),
        prefix: chain.prefix,
        pngSrc: token.img?.png ?? "",
        erc20Address: token.erc20Address,
        tokenIdentifier: token.tokenRepresentation,
        price24HChange: String(tokenPrice?.usd.priceChange ?? "0"),
      };
    })
    .sort((a, b) => {
      return a.tokenName === "EVMOS" ? -1 : b.tokenName === "EVMOS" ? 1 : 0;
    });

  return { balance };
};

export type ERC20BalanceResponse = Awaited<
  ReturnType<typeof legacyFetchERC20ModuleBalance>
>;
