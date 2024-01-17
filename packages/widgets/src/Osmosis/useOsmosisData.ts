import { useQueries } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { AccountBalanceByDenomQueryOptions } from "@evmosapps/trpc/procedures/account/account-balance-by-denom/client";
import { TokenByDenomQueryOptions } from "@evmosapps/trpc/procedures/tokens/queries/token-by-denom/client";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { raise } from "helpers";
export type SwapOption = {
  erc20Address: string;
  name: string;
  symbol: string;
  tokenIdentifier: string;
  chain: string;
  balance: string;
  price: number | null;
  decimals: number;
  osmosisDenom: string;
};

export function useOsmosisData() {
  const { address } = useAccount();

  const chainRef = useEvmosChainRef();
  return useQueries({
    queries: [
      TokenByDenomQueryOptions("EVMOS"),
      TokenByDenomQueryOptions("OSMO"),
      AccountBalanceByDenomQueryOptions({
        address,
        chainRef,
        denom: "EVMOS",
      }),
      AccountBalanceByDenomQueryOptions({
        address,
        chainRef,
        denom: "OSMO",
      }),
    ],

    combine: ([
      { data: evmosToken },
      { data: osmoToken },
      { data: evmosBalance },
      { data: osmoBalance },
    ]) => {
      if (!evmosToken || !osmoToken || !evmosBalance || !osmoBalance) {
        return {
          pending: true,
          data: null,
        } as const;
      }

      const osmosis = {
        ...osmoToken,
        chain: "Osmosis",
        balance: osmoBalance.balance.erc20,
        price: osmoBalance.price?.usd.price ?? raise("osmo price not found"),
        osmosisDenom: osmoToken.minCoinDenom,
      } as const;

      const evmos = {
        ...evmosToken,
        chain: "Evmos",
        balance: evmosBalance.balance.cosmos,
        price: evmosBalance.price?.usd.price ?? raise("evmos price not found"),

        osmosisDenom:
          "ibc/6AE98883D4D5D5FF9E50D7130F1305DA2FFA0C652D1DD9C123657C6B4EB2DF8A",
      } as const;

      return {
        pending: false,
        data: {
          osmosis,
          evmos,
        },
      } as const;
    },
  });
}
