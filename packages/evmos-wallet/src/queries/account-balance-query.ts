import { queryOptions } from "@tanstack/react-query";
import { Address } from "..";
multicall;

import { queryClient } from "helpers/src/clients/query";
import { multicall } from "wagmi/actions";
import { AllTokenQueryOptions } from "./all-tokens-query";
import { TokenDetails } from "@evmosapps/registry/src/fetch-tokens";
import { CosmosAccountBalanceQueryOptions } from "./cosmos-account-balance-query";
import { ERC20AccountBalanceQueryOptions } from "./erc20-account-balance-query";
import { getEvmosIdentifier } from "../wallet/actions/getEvmosIdentifier";

export const AccountBalanceQueryOptions = ({
  chain = getEvmosIdentifier(),
  address,
}: {
  address?: Address;
  chain?: string;
}) => {
  return queryOptions({
    queryKey: ["accountBalance", chain, address],
    queryFn: async () => {
      const tokensPromise = queryClient.fetchQuery(AllTokenQueryOptions());
      const cosmosBalancesPromise = queryClient.fetchQuery(
        CosmosAccountBalanceQueryOptions({ chain, address })
      );
      const erc20BalancesPromise = chain.startsWith("evmos")
        ? queryClient.fetchQuery(
            ERC20AccountBalanceQueryOptions({ chain, address })
          )
        : Promise.resolve([]);

      const [tokens, cosmos, erc20] = await Promise.all([
        tokensPromise,

        cosmosBalancesPromise,
        erc20BalancesPromise,
      ]);

      const tokenByDenom = new Map(
        tokens.map((token) => [token.coinDenom, token])
      );
      const outputTokens = new Map<
        string,
        TokenDetails & {
          balance: {
            er20: bigint;
            cosmos: bigint;
            total: bigint;
          };
        }
      >();

      cosmos.forEach(({ denom, amount }) => {
        const token = tokenByDenom.get(denom);
        if (!token) {
          return;
        }
        const outputToken = outputTokens.get(token.coinDenom);
        if (!outputToken) {
          outputTokens.set(token.coinDenom, {
            ...token,
            balance: {
              er20: 0n,
              cosmos: amount,
              total: amount,
            },
          });
        } else {
          outputToken.balance.cosmos += amount;
          outputToken.balance.total += amount;
        }
      });

      erc20.forEach(({ denom, amount }) => {
        const token = tokenByDenom.get(denom);
        if (!token) {
          return;
        }
        const outputToken = outputTokens.get(token.coinDenom);
        if (!outputToken) {
          outputTokens.set(token.coinDenom, {
            ...token,
            balance: {
              er20: amount,
              cosmos: 0n,
              total: amount,
            },
          });
        } else {
          outputToken.balance.er20 += amount;
          outputToken.balance.total += amount;
        }
      });

      return Array.from(outputTokens.values());
    },
    staleTime: 15 * 1000,
    enabled: !!address,
  });
};
