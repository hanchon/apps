"use server";
import { TokenSymbol } from "@evmosapps/registry/autogen/registry";
import { fetchTokenPrices } from "./fetch-token-prices";
import { raise } from "helpers/src/error-handling/assertions";

export const fetchTokenPriceByDenom = async (
  denom: TokenSymbol | (string & {})
) => {
  return (
    (await fetchTokenPrices().then((prices) =>
      Object.values(prices).find(
        (price) => price.coinDenom.toLowerCase() === denom.toLowerCase()
      )
    )) ?? raise("Token price not found")
  );
};
