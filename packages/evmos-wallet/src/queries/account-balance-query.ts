import { queryOptions } from "@tanstack/react-query";
import { AllTokenPricesQueryOptions } from "./all-token-prices-query";
import {
  Address,
  normalizeToCosmosAddress,
  normalizeToEth,
  wagmiConfig,
} from "..";
import { CosmosQueryOptions } from "./cosmos-rest-query";
import { isUndefined } from "helpers";
multicall;

import { queryClient } from "helpers/src/clients/query";
import { getChainId, multicall } from "wagmi/actions";
import { TokenQueryOptions } from "./token-query";
import { AllTokenQueryOptions } from "./all-tokens-query";
import { Hex, erc20Abi } from "viem";
import { fetchTokenByIbcDenom } from "../server/fetch-token-by-ibc-hash.server";

export const ERC20AccountBalanceQueryOptions = (
  chain: string,
  address?: Address
) =>
  queryOptions({
    queryKey: ["ERC20AccountBalances", chain, address ?? ""],
    queryFn: async () => {
      if (!address) {
        return [];
      }
      // const chainId = getChainId(wagmiConfig);
      const chainObject = wagmiConfig.chains.find(
        (chainObject) => chainObject.identifier === chain
      );
      if (!chainObject) {
        return [];
      }
      const tokens = await queryClient
        .fetchQuery(AllTokenQueryOptions())
        .then((tokens) =>
          tokens.filter(
            (token) => token.networkType === chainObject?.networkType
          )
        );
      const balances = await multicall(wagmiConfig, {
        chainId: chainObject.id,
        contracts: tokens.map((token) => ({
          abi: erc20Abi,
          address: token.erc20Address as Hex,
          functionName: "balanceOf",
          args: [normalizeToEth(address)],
        })),
      });

      return balances
        .reduce<
          {
            denom: string;
            amount: bigint;
          }[]
        >((acc, response, index) => {
          if (response.status !== "success") return acc;
          const token = tokens[index];
          if (!token) return acc;

          acc.push({
            denom: token.coinDenom,
            amount: BigInt(response.result ?? "0"),
          });
          return acc;
        }, [])
        .filter(({ amount }) => amount > 0n);
    },
    staleTime: 15 * 1000,
    enabled: !!address,
  });
export const CosmosAccountBalanceQueryOptions = (
  chain: string,
  address?: Address
) =>
  queryOptions({
    ...CosmosQueryOptions(chain, {
      route: "/cosmos/bank/v1beta1/balances/{address}",
      queryKey: [
        "CosmosAccountBalances",
        chain,
        String(getChainId(wagmiConfig)),
        address ?? "",
      ],
      params: {
        path: {
          address: address ? normalizeToCosmosAddress(address) : "",
        },
      },
      select: (data) =>
        data.balances?.flatMap(({ amount, denom }) => {
          if (isUndefined(amount) || isUndefined(denom)) {
            return [];
          }
          return [
            {
              denom,
              amount: BigInt(amount),
            },
          ];
        }) ?? [],
    }),
    staleTime: 15 * 1000,
    enabled: !!address,
  });

type TokenBalance = {
  denom: string;
  amount: bigint;
  decimals: number;
} & (
  | {
      type: "ERC20";
      contractAddress: Hex;
    }
  | {
      type: "COSMOS";
      ibcDenom: string;
    }
);

export const TokenByIbcDenom = (ibcDenom?: string) =>
  queryOptions({
    queryKey: ["tokenByIbcDenom", ibcDenom],
    queryFn: async () => {
      if (!ibcDenom) {
        return null;
      }
      return await fetchTokenByIbcDenom(ibcDenom);
    },
    staleTime: Infinity,

    enabled: !!ibcDenom,
  });
export const AccountBalanceQueryOptions = (
  chain: string,
  address?: Address
) => {
  return queryOptions({
    queryKey: ["accountBalance", chain, address],
    queryFn: async () => {
      const tokensPromise = queryClient.fetchQuery(AllTokenQueryOptions()).then(
        (tokens) =>
          new Map(
            tokens.flatMap((token) => [
              [token.coinDenom, token],
              [token.minCoinDenom, token],
            ])
          )
      );
      const cosmosBalancesPromise = queryClient.fetchQuery(
        CosmosAccountBalanceQueryOptions(chain, address)
      );

      const erc20BalancesPromise = chain.startsWith("evmos")
        ? queryClient.fetchQuery(
            ERC20AccountBalanceQueryOptions(chain, address)
          )
        : Promise.resolve([]);
      const [tokenMap, cosmos, erc20] = await Promise.all([
        tokensPromise,
        cosmosBalancesPromise,
        erc20BalancesPromise,
      ]);

      const cosmosBalances = await Promise.all(
        cosmos.map(async ({ denom, amount }) => {
          const token = denom.startsWith("ibc/")
            ? await queryClient.fetchQuery(TokenQueryOptions(denom))
            : tokenMap.get(denom);
          if (!token) {
            return [];
          }

          return [
            {
              denom: token.coinDenom,
              amount,
              decimals: token.exponent,
              type: "COSMOS",
              ibcDenom: denom,
            },
          ];
        })
      ).then((tokens) => tokens.flat());

      const erc20Balances = erc20
        .map(({ denom, amount }): TokenBalance[] => {
          const token = tokenMap.get(denom);
          if (!token) {
            return [];
          }
          return [
            {
              denom: token.coinDenom,
              amount,
              decimals: token.exponent,
              type: "ERC20",
              contractAddress: token.erc20Address as Hex,
            },
          ];
        })
        .flat();

      return [...cosmosBalances, ...erc20Balances];
    },
    staleTime: 15 * 1000,
    enabled: !!address,
  });
};
