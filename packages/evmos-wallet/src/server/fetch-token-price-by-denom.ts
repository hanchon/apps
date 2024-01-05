"use server";
import { TokenSymbol } from "@evmosapps/registry/autogen/registry";
import { fetchTokenPrices } from "./fetch-token-prices";
import { raise } from "helpers/src/error-handling/assertions";
import { unstable_cache as cache } from "next/cache";

export const fetchTokenPriceByDenom = cache(
  async (denom: TokenSymbol | (string & {})) => {
    return (
      (await fetchTokenPrices().then((prices) => prices[denom])) ??
      raise("Token price not found")
    );
  },
  ["fetchTokenPriceByDenom"],
  {
    revalidate: 5 * 60,
  }
);
