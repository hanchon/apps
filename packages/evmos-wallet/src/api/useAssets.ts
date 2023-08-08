// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../redux/Store";
import { ERC20BalanceResponse } from "./types";
import { getAssetsForAddress } from "./fetch";

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

    return `$${Number(assets.data.balance[0].coingeckoPrice).toFixed(2)}`;
  }, [assets.data]);

  return {
    evmosPriceFixed,
  };
};
