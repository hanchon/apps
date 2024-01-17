import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { AccountBalanceByDenomQueryOptions } from "@evmosapps/trpc/procedures/account/account-balance-by-denom/client";

export function useEvmosData() {
  const { address } = useAccount();

  const chainRef = useEvmosChainRef();
  // TODO: is used on Header for EvmosPrice component
  const { data } = useQuery(
    AccountBalanceByDenomQueryOptions({
      address,
      denom: "EVMOS",
      chainRef,
    })
  );

  return {
    balance: data?.balance?.erc20.toString() ?? "0",
    evmosPrice: data?.price?.usd.price.toString() ?? "0",
  };
}
