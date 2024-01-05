"use server";
import { TokenSymbol } from "@evmosapps/registry/autogen/registry";
import { fetchTokenPrices } from "./fetch-token-prices";
import { raise } from "helpers/src/error-handling/assertions";
import { unstable_cache } from "next/cache";

const revalidate = 5 * 60 * 1000; // 5 minutes
const _fetchTokenPriceByDenom = async (denom: TokenSymbol | (string & {})) => {
  return (
    (await fetchTokenPrices().then((prices) => prices[denom])) ??
    raise("Token price not found")
  );
};

export const fetchTokenPriceByDenom = unstable_cache(
  _fetchTokenPriceByDenom,
  ["fetchTokenPriceByDenom"],
  {
    revalidate,
  }
);
