import { queryOptions } from "@tanstack/react-query";
import { Address, normalizeToEth, wagmiConfig } from "..";
import { queryClient } from "helpers/src/clients/query";
import { multicall } from "wagmi/actions";
import { AllTokenQueryOptions } from "./all-tokens-query";
import { Hex, erc20Abi } from "viem";
import { getEvmosIdentifier } from "../wallet/actions/getEvmosIdentifier";

export const ERC20AccountBalanceQueryOptions = ({
  chain = getEvmosIdentifier(),
  address,
}: {
  address?: Address;
  chain?: string;
}) =>
  queryOptions({
    queryKey: ["ERC20AccountBalances", chain, address ?? ""],
    queryFn: async () => {
      if (!address) {
        return [];
      }

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
