// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";
import { raise } from "helpers";
import { MoneyInput } from "@evmosapps/ui-helpers/src/MoneyInput";
import { useTrpcQuery } from "@evmosapps/trpc/client";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";

import { GAS, TokenBalanceProps } from "./constants";

export const TokenAmountInput = ({
  token,
  address,
  tokenType,
  value,
  onChange,
}: Partial<TokenBalanceProps> & {
  onChange?: (value: bigint) => void;
  value?: bigint;
}) => {
  const chainRef = useEvmosChainRef();
  const { data, isFetching, isLoading } = useTrpcQuery((t) =>
    t.account.balance.byDenom({
      denom: token ?? raise("no token"),
      address: address ?? raise("no address"),
      chainRef,
    }),
  );

  let max = tokenType === "ERC20" ? data?.balance.erc20 : data?.balance.cosmos;

  if (typeof max !== "undefined" && token === "EVMOS") {
    max -= GAS;
  }

  return (
    <>
      {isFetching}
      <MoneyInput
        className={
          "flex rounded-lg border border-darkGray5 bg-white  focus-within:border-black hover:border-black focus-visible:border-black text-sm px-3 py-2"
        }
        disabled={isLoading}
        decimals={data?.decimals}
        max={max}
        min={0n}
        value={value}
        onChange={onChange}
      >
        <MoneyInput.Input />
        <MoneyInput.MaxButton className="text-sm py-1 px-2" />
      </MoneyInput>
    </>
  );
};
