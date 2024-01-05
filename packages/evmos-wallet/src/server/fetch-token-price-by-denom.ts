import { TokenSymbol } from "@evmosapps/registry/autogen/registry";
import { fetchTokenPrices } from "./fetch-token-prices";
import { raise } from "helpers/src/error-handling/assertions";

export const fetchTokenPriceByDenom = async (
  denom: TokenSymbol | (string & {})
) => {
  return (
    (await fetchTokenPrices().then((prices) =>
      Object.values(prices).find(({ coinDenom }) => {
        return coinDenom.toLowerCase() === denom.toLowerCase();
      })
    )) ?? raise("Token price not found")
  );
};

export const apiFetchTokenPriceByDenom = async (
  denom: TokenSymbol | (string & {})
) => {
  return fetch(`/api/actions/token-price-by-denom/${denom.toLowerCase()}`).then(
    (res) => res.json()
  ) as ReturnType<typeof fetchTokenPriceByDenom>;
};
