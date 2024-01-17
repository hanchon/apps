import { TokenDenom } from "../../../../../autogen/registry";
import { fetchTokenPrices } from "../token-prices/server";

export const fetchTokenPriceByDenom = async (
  denom: TokenDenom | (string & {})
) => {
  const tokenPrices = await fetchTokenPrices();
  return (
    tokenPrices.find((tokenPrice) => tokenPrice.coinDenoms.includes(denom)) ??
    null
  );
};
