import { useMemo } from "react";
import {
  TokenDenom,
  TokenMinDenom,
} from "evmos-wallet/src/registry-actions/types";
import { getTokenByDenom, useAssets } from "evmos-wallet";

export const useTokenPrice = (tokenMinDenom: TokenMinDenom) => {
  const { sourceData: assets } = useAssets();

  const priceMap = useMemo(
    () =>
      (assets?.balance ?? []).reduce(
        (acc, { symbol, coingeckoPrice, tokenIdentifier }) => {
          const denom = getTokenByDenom(symbol as TokenDenom)?.minCoinDenom;
          if (!denom) {
            return acc;
          }
          acc[denom] = coingeckoPrice;
          return acc;
        },
        {} as Record<TokenMinDenom, string | undefined>
      ),
    [assets]
  );
  return priceMap[tokenMinDenom];
};
