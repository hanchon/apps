import { useAccount } from "wagmi";

import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { useTrpcQuery } from "@evmosapps/trpc/client";
import { raise } from "helpers";
export function useEvmosData() {
  const { address } = useAccount();

  const chainRef = useEvmosChainRef();

  const { data } = useTrpcQuery((t) =>
    t.account.balance.byDenom({
      address: address ?? raise("no address"),
      denom: "EVMOS",
      chainRef: chainRef ?? raise("no chainRef"),
    })
  );

  return {
    balance: data?.balance?.cosmos.toString() ?? "0",
    evmosPrice: data?.price?.usd.price.toString() ?? "0",
  };
}
