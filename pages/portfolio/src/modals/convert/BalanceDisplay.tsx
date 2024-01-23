// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";
import { ComponentProps } from "react";
import { trpc } from "@evmosapps/trpc/client";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { formatUnits } from "@evmosapps/evmos-wallet/src/registry-actions/utils/format-units";
import { TokenBalanceProps } from "./constants";

export const BalanceDisplay = ({
  address,
  token,
  tokenType,
  hideSymbol = false,
  ...rest
}: TokenBalanceProps & {
  hideSymbol?: boolean;
} & ComponentProps<"span">) => {
  const chainRef = useEvmosChainRef();
  const [data] = trpc.account.balance.byDenom.useSuspenseQuery({
    denom: token,
    address,
    chainRef,
  });

  const balance =
    tokenType === "ERC20" ? data.balance.erc20 : data.balance.cosmos;
  return (
    <span {...rest}>
      {formatUnits(balance, data.decimals)}
      {!hideSymbol && ` ${data.denom}`}
    </span>
  );
};
