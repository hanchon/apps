"use server";
import { TokenSymbol } from "@evmosapps/registry/autogen/registry";
import { fetchTokenPrices } from "./fetch-token-prices";
import { raise } from "helpers/src/error-handling/assertions";
import { unstable_cache } from "next/cache";
export const fetchTokenPriceByDenom = unstable_cache(
  async (denom: TokenSymbol | (string & {})) => {
    const token =
      (await fetchTokenPrices().then((prices) =>
        Object.values(prices).find(({ coinDenom }) => {
          return coinDenom.toLowerCase() === denom.toLowerCase();
        })
      )) ?? raise("Token price not found");
    return {
      ...token,
      dt: new Date().toISOString(),
    };
  },
  ["fetchTokenPriceByDenom"],
  {
    revalidate: 60,
  }
);

// export const apiFetchTokenPriceByDenom = async (
//   denom: TokenSymbol | (string & {})
// ) => {
//   return fetch(`/api/actions/token-price-by-denom/${denom.toLowerCase()}`).then(
//     (res) => res.json()
//   ) as ReturnType<typeof fetchTokenPriceByDenom>;
// };
