// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { EVMOS_BACKEND } from "../internal/wallet/functionality/networkConfig";
import { StoreType } from "../redux/Store";

export const getAssets = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/ERC20ModuleBalance`);
  return res.json() as Promise<ERC20BalanceResponse>;
};
export const getAssetsForAddress = async (
  address: string,
  hexAddress: string
) => {
  // If not wallet selected return everything empty
  if (address === "" || hexAddress === "") {
    return getAssets();
  }

  const res = await fetch(
    `${EVMOS_BACKEND}/ERC20ModuleBalance/${address}/${hexAddress}`
  );
  return res.json() as Promise<ERC20BalanceResponse>;
};

export type ERC20Element = {
  name: string;
  cosmosBalance: string;
  decimals: string;
  description: string;
  erc20Balance: string;
  symbol: string;
  tokenName: string;
  chainId: string;
  chainIdentifier: string;
  // Currently only axelar assets are external actions
  handledByExternalUI: null | { handlingAction: string; url: string }[];
  coingeckoPrice: string;
  prefix: string;
  pngSrc: string;
  erc20Address: string;
  tokenIdentifier: string;
};

export type ERC20BalanceResponse = {
  balance: ERC20Element[];
};

export const useAssets = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  const assets = useQuery<ERC20BalanceResponse, Error>({
    queryKey: [
      "evmos-assets",
      value.evmosAddressCosmosFormat,
      value.evmosAddressEthFormat,
    ],
    queryFn: () =>
      getAssetsForAddress(
        value.evmosAddressCosmosFormat,
        value.evmosAddressEthFormat
      ),
  });

  const evmosPriceFixed = useMemo(() => {
    if (assets.data === undefined || assets.data.balance.length === 0) {
      return "-";
    }

    return Number(assets.data.balance[0].coingeckoPrice).toFixed(2);
  }, [assets.data]);

  return {
    evmosPriceFixed,
  };
};
