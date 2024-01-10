"use server";
import { TokenSymbol } from "@evmosapps/registry/autogen/registry";
import { fetchTokenPrices } from "./fetch-token-prices";

export const fetchTokenPriceByDenom = async (
  denom: TokenSymbol | (string & {})
) => {
  const tokenPrices = await fetchTokenPrices();
  const token = tokenPrices.find(({ coinDenoms }) =>
    coinDenoms.find(
      (coinDenom) => coinDenom.toLowerCase() === denom.toLowerCase()
    )
  );

  if (!token) {
    return null;
  }

  return {
    ...token,
    dt: new Date().toISOString(),
  };
};
