import { fetchTokenPrices } from "../../tokens/queries/token-prices/server";
import { omit } from "lodash-es";
import { raise } from "helpers";
import { fetchTokens } from "../../tokens/queries/server";

export const formatBalance = ({
  token,
  cosmos,
  erc20,
  tokenPrice,
}: {
  token: Awaited<ReturnType<typeof fetchTokens>>[number];
  erc20: bigint;
  cosmos: bigint;
  tokenPrice?: Awaited<ReturnType<typeof fetchTokenPrices>>[number];
}) => {
  const total = cosmos + erc20;
  return {
    denom: token.coinDenom,
    // TODO: token image should be a required field in the registry
    img: token.img?.png ?? raise("token image not found"),
    decimals: token.exponent,
    balance: {
      cosmos,
      erc20,
      total,
    },
    price: tokenPrice ? omit(tokenPrice, ["coinDenoms", "coingeckoId"]) : null,
  };
};
