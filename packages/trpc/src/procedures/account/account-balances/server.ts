import { serverCosmos } from "../../utils/cosmos-server-client";

import { evmosServerClient } from "../../utils/evmos-server-client";
import { Hex, erc20Abi } from "viem";
import { normalizeToEth } from "helpers/src/crypto/addresses/normalize-to-eth";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { Address } from "helpers/src/crypto/addresses/types";
import { fetchTokenPrices } from "../../tokens/queries/token-prices/server";

import { formatBalance } from "../utils/format-balance";

import { fetchTokens } from "../../tokens/queries/server";

export const fetchAccountBalances = async ({
  chain,
  address,
}: {
  chain: string;
  address: Address;
}) => {
  const [cosmosClient, evmosClient, tokens, tokenPrices] = await Promise.all([
    serverCosmos(chain),
    chain.startsWith("evmos") ? evmosServerClient(chain) : null,
    fetchTokens(),
    fetchTokenPrices(),
  ]);

  const tokenMap = Object.fromEntries(
    tokens.flatMap((token) => {
      if (token.source.startsWith("evmos"))
        return [
          [token.cosmosDenom, token],
          [token.coinDenom, token],
          [token.minCoinDenom, token],
        ];
      return [
        [token.cosmosDenom, token],
        [token.coinDenom, token],
      ];
    })
  );

  const balanceMap = new Map<
    string,
    {
      erc20: bigint;
      cosmos: bigint;
    }
  >();
  const cosmosBalancePromise = cosmosClient
    .GET("/cosmos/bank/v1beta1/balances/{address}", {
      params: {
        path: {
          address: normalizeToCosmos(address),
        },
      },
    })
    .then(({ data }) => {
      data?.balances?.forEach(({ denom, amount = "0" }) => {
        if (!denom) return;
        const token = tokenMap[denom];

        if (!token) {
          return;
        }

        const cosmo = BigInt(amount);
        if (cosmo === 0n) return;
        const balance = balanceMap.get(token.coinDenom) ?? {
          cosmos: 0n,
          erc20: 0n,
        };
        balanceMap.set(token.coinDenom, {
          cosmos: BigInt(amount),
          erc20: balance.erc20 ?? 0n,
        });
      });
    });

  const evmosBalancePromise =
    evmosClient
      ?.multicall({
        contracts: tokens.map((token) => ({
          abi: erc20Abi,
          address: token.erc20Address as Hex,
          functionName: "balanceOf",
          args: [normalizeToEth(address)],
        })),
      })
      .then((balances) => {
        return balances.forEach((response, index) => {
          if (response.status !== "success") return;
          const token = tokens[index];
          if (!token) return;
          const erc20 = BigInt(response.result ?? "0");
          if (erc20 === 0n) return;

          const balance = balanceMap.get(token.coinDenom) ?? {
            cosmos: 0n,
            erc20,
          };
          balanceMap.set(token.coinDenom, {
            cosmos: balance.cosmos ?? 0n,
            erc20,
          });
        });
      }) ?? Promise.resolve();
  await Promise.all([cosmosBalancePromise, evmosBalancePromise]);

  const tokenPriceMap = new Map(
    tokenPrices.map((token) => [token.coingeckoId, token])
  );
  return [...balanceMap.entries()].flatMap(([denom, { cosmos, erc20 }]) => {
    const token = tokenMap[denom];
    if (!token) return [];

    return [
      formatBalance({
        token,
        cosmos,
        erc20,
        tokenPrice: tokenPriceMap.get(token.coingeckoId),
      }),
    ];
  });
};
