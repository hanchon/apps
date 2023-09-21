import { useMemo } from "react";
import {
  TokenDenom,
  TokenRef,
} from "evmos-wallet/src/registry-actions/types";
import { getTokenByDenom, useAssets } from "evmos-wallet";

export const useTokenPrice = (tokenRef: TokenRef) => {
  const { sourceData: assets } = useAssets();

  const priceMap = useMemo(
    () =>
      (assets?.balance ?? []).reduce(
        (acc, { symbol, coingeckoPrice }) => {
          const ref = getTokenByDenom(symbol as TokenDenom)?.ref;
          if (!ref) {
            return acc;
          }
          acc[ref] = coingeckoPrice;
          return acc;
        },
        {} as Record<TokenRef, string | undefined>,
      ),
    [assets],
  );
  return priceMap[tokenRef];
};
