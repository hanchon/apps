import { getToken, useTokenBalance } from "@evmosapps/evmos-wallet";
import { getAssetsForAddress } from "@evmosapps/evmos-wallet/src/api/fetch";
import { ERC20BalanceResponse } from "@evmosapps/evmos-wallet/src/api/types";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { useSelector } from "react-redux";
import { StoreType } from "@evmosapps/evmos-wallet";
export type SwapOption = {
  erc20Address: string;
  name: string;
  symbol: string;
  tokenIdentifier: string;
  chain: string;
  balance: string;
  price: number;
  decimals: number;
  osmosisDenom: string;
};

export function useOsmosisData() {
  const value = useSelector((state: StoreType) => state.wallet.value);

  const { data, error, isLoading } = useQuery<ERC20BalanceResponse, Error>({
    refetchInterval: 15_000,
    queryKey: [
      "assets",
      value.evmosAddressCosmosFormat,
      value.evmosAddressEthFormat,
    ],
    queryFn: () =>
      getAssetsForAddress(
        value.evmosAddressCosmosFormat,
        value.evmosAddressEthFormat
      ),
  });

  const osmoBalance = data?.balance?.find((b) => b.symbol === "OSMO");
  const evmosBalance = data?.balance?.find((b) => b.symbol === "EVMOS");

  const osmosis: SwapOption = {
    erc20Address: osmoBalance?.erc20Address ?? "",
    name: osmoBalance?.name ?? "Osmo",
    symbol: osmoBalance?.symbol ?? "OSMO",
    tokenIdentifier: osmoBalance?.tokenIdentifier ?? "",
    chain: "Osmosis",
    balance: osmoBalance?.erc20Balance ?? "0",
    price: parseFloat(osmoBalance?.coingeckoPrice ?? "0"),
    decimals: parseInt(osmoBalance?.decimals ?? "0"),
    osmosisDenom: "uosmo",
  };

  const evmos: SwapOption = {
    erc20Address: evmosBalance?.erc20Address ?? "",
    name: evmosBalance?.name ?? "Evmos",
    symbol: evmosBalance?.symbol ?? "EVMOS",
    tokenIdentifier: evmosBalance?.tokenIdentifier ?? "",
    chain: "Evmos",
    balance: evmosBalance?.erc20Balance ?? "0",
    price: parseFloat(evmosBalance?.coingeckoPrice ?? "0"),
    decimals: parseInt(evmosBalance?.decimals ?? "0"),
    osmosisDenom:
      "ibc/6AE98883D4D5D5FF9E50D7130F1305DA2FFA0C652D1DD9C123657C6B4EB2DF8A",
  };

  return {
    osmosis,
    evmos,
  };
}
