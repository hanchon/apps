import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { AmountInput } from "ui-helpers";
import { chains } from "@evmos-apps/registry";
import { Prefix, TokenMinDenom } from "evmos-wallet/src/registry-actions/types";
import { CryptoSelector } from "./CryptoSelector";
import {
  Address,
  getPrefix,
  getTokenByMinDenom,
  normalizeToCosmosAddress,
  useAccountBalances,
  useAssets,
} from "evmos-wallet";
import { CryptoSelectorTitle } from "./CryptoSelectorTitle";
import { useTranslation } from "next-i18next";
import { formatUnits } from "viem";
import { useTokenPrice } from "../hooks/useTokenPrice";
type Asset = {
  chainPrefix: Prefix;
  denom: TokenMinDenom;
  amount: bigint;
};

const tokenToUSD = (amount: bigint, price: number, decimals: number) => {
  const unformmatedUsd = Number(
    formatUnits((amount * BigInt(~~(1000 * Number(price)))) / 1000n, decimals)
  );
  return unformmatedUsd.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const AssetSelector = ({
  value,
  onChange,
  address,
}: PropsWithChildren<{
  value: Asset;
  onChange: (value: Asset) => void;
  address?: Address<Prefix>;
}>) => {
  const { t } = useTranslation();
  // const [selectedChainPrefix, setSelectedChainPrefix] =
  //   useState<Prefix>("evmos");

  const selectedChain = chains[value.chainPrefix];
  const selectedToken = getTokenByMinDenom(value.denom);

  const networkOptions = useMemo(
    () => Object.values(chains).map(({ prefix }) => prefix),
    []
  );

  /**
   * token options are equal to the native network tokens + evmos tokens
   */
  const tokenOptions = useMemo(() => {
    const nativeNetworkTokens = selectedChain.currencies.map(
      ({ minCoinDenom }) => minCoinDenom
    );
    if (selectedChain.prefix === "evmos") return nativeNetworkTokens;

    const evmosTokens = chains.evmos.currencies.map(
      ({ minCoinDenom }) => minCoinDenom
    );
    return [...nativeNetworkTokens, ...evmosTokens];
  }, [value.chainPrefix]);

  /**
   * When network changes, check if the selected token is available on the new network.
   * If not, set the first available token as the selected token.
   */
  useEffect(() => {
    if (tokenOptions.includes(value.denom)) return;
    onChange({
      ...value,
      denom: tokenOptions[0],
    });
  }, [tokenOptions]);

  const { assets } = useAssets();
  const price = useTokenPrice(value.denom);

  const {
    data: balances,
    isFetching: isFetchingBalance,
    status,
  } = useAccountBalances(address);

  const balance = balances?.find(({ minDenom }) => minDenom === value.denom);

  const amountInUsd = price
    ? tokenToUSD(value.amount, Number(price), selectedToken.decimals)
    : null;
  return (
    <div className="bg-gray-600 p-3 rounded-md space-y-3 mb-8">
      <div className="flex justify-between h-full relative">
        <div className="justify-center flex flex-col h-full">
          <CryptoSelectorTitle>
            {t("transfer.section.asset.token")}
          </CryptoSelectorTitle>
          <CryptoSelector
            value={value.denom}
            onChange={(denom) =>
              onChange({
                ...value,
                amount: 0n,
                denom,
              })
            }
          >
            <CryptoSelector.Button
              src={`/assets/tokens/${selectedToken.denom}.png`}
              variant="black"
            >
              {selectedToken.name.toLowerCase()}
            </CryptoSelector.Button>
            <CryptoSelector.Options>
              {tokenOptions.map((token) => {
                const { denom, name } = getTokenByMinDenom(token);
                return (
                  <CryptoSelector.Option
                    src={`/assets/tokens/${denom}.png`}
                    key={token}
                    value={token}
                  >
                    {name}
                  </CryptoSelector.Option>
                );
              })}
            </CryptoSelector.Options>
          </CryptoSelector>
        </div>
        <div className="justify-center flex flex-col h-full">
          <CryptoSelectorTitle>
            {t("transfer.section.asset.network")}
          </CryptoSelectorTitle>
          <CryptoSelector
            value={value.chainPrefix}
            onChange={(prefix) => {
              onChange({
                ...value,
                amount: 0n,
                chainPrefix: prefix,
              });
            }}
          >
            <CryptoSelector.Button
              src={`/assets/chains/${value.chainPrefix}.png`}
            >
              {selectedChain.name}
            </CryptoSelector.Button>
            <CryptoSelector.Options>
              {networkOptions.map((value) => {
                const chain = chains[value];
                return (
                  <CryptoSelector.Option
                    src={`/assets/chains/${value}.png`}
                    key={value}
                    value={value}
                  >
                    {chain.name}
                  </CryptoSelector.Option>
                );
              })}
            </CryptoSelector.Options>
          </CryptoSelector>
        </div>
      </div>
      <AmountInput
        value={value.amount}
        max={balance?.value ?? 0n}
        onChange={(amount) => {
          onChange({
            ...value,
            amount,
          });
        }}
        decimals={selectedToken.decimals}
      />

      <div className="text-xs flex justify-between pl-4">
        <div>{amountInUsd !== null && `≈${amountInUsd}`}</div>
        <div>
          {!balance && isFetchingBalance && (
            <span className="opacity-50">Loading balance...</span>
          )}
          {balance && (
            <>
              <span className="opacity-50">Balance: </span>
              {balance?.formattedLong ?? "0"} {selectedToken.denom}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
