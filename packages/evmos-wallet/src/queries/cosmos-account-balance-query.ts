import { queryOptions } from "@tanstack/react-query";
import { Address, normalizeToCosmosAddress, wagmiConfig } from "..";
import { CosmosQueryOptions } from "./cosmos-rest-query";
import { isUndefined } from "helpers";
import { getChainId } from "wagmi/actions";
import { queryClient } from "helpers/src/clients/query";
import { TokenByIbcDenom } from "./token-by-ibc-denom";
import { getEvmosIdentifier } from "../wallet/actions/getEvmosIdentifier";
import { AllTokenQueryOptions } from "./all-tokens-query";

const RawCosmosAccountBalanceQueryOptions = ({
  chain = getEvmosIdentifier(),
  address,
}: {
  address?: Address;
  chain?: string;
}) =>
  queryOptions({
    ...CosmosQueryOptions(chain, {
      route: "/cosmos/bank/v1beta1/balances/{address}",
      queryKey: [
        "RawCosmosAccountBalances",
        chain,
        String(getChainId(wagmiConfig)),
        address ?? "",
      ],
      params: {
        path: {
          address: address ? normalizeToCosmosAddress(address) : "",
        },
      },
    }),
    staleTime: 15 * 1000,
    enabled: !!address,
  });

export const CosmosAccountBalanceQueryOptions = ({
  chain = getEvmosIdentifier(),
  address,
}: {
  address?: Address;
  chain?: string;
}) =>
  queryOptions({
    queryKey: ["CosmosAccountBalances", chain, address ?? ""],
    queryFn: async () => {
      const [{ balances }, tokenMap] = await Promise.all([
        queryClient.fetchQuery(
          RawCosmosAccountBalanceQueryOptions({ chain, address })
        ),
        queryClient.fetchQuery(AllTokenQueryOptions()).then(
          (tokens) =>
            new Map(
              tokens.flatMap((token) => [
                [token.minCoinDenom, token],
                [token.cosmosDenom, token],
              ])
            )
        ),
      ]);
      return (
        balances?.flatMap(({ amount, denom }) => {
          if (isUndefined(amount) || isUndefined(denom)) return [];
          const token = tokenMap.get(denom);
          if (!token) return [];
          return [
            {
              denom: token.coinDenom,
              amount: BigInt(amount),
            },
          ];
        }) ?? []
      );
      // queryClient
      //   .fetchQuery(RawCosmosAccountBalanceQueryOptions({ chain, address }))
      //   .then((response) =>
      //     Promise.all(
      //       response?.balances?.map(async ({ amount, denom }) => {
      //         if (isUndefined(amount) || isUndefined(denom)) return [];
      //         const token = await queryClient.fetchQuery(
      //           TokenByIbcDenom({ chain, denom })
      //         );

      //         if (!token) return [];

      //         return [
      //           {
      //             denom: token.coinDenom,
      //             amount: BigInt(amount),
      //           },
      //         ];
      //       }) ?? []
      //     )
      //   )
      //   .then((balances) => balances.flat());
    },
  });
