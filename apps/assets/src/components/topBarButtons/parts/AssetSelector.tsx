import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  AmountInput,
  CryptoSelectorBalanceBox,
  CryptoSelectorBalanceText,
  CryptoSelectorBox,
  CryptoSelectorDropdownBox,
} from "ui-helpers";
import { chains } from "@evmos-apps/registry";
import { Prefix, TokenMinDenom } from "evmos-wallet/src/registry-actions/types";
import { CryptoSelector } from "ui-helpers";
import { Address, getTokenByMinDenom, useTokenBalance } from "evmos-wallet";
import { CryptoSelectorTitle } from "ui-helpers";
import { useTranslation } from "next-i18next";
import { formatUnits } from "viem";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { max } from "helpers";
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
  fee,
  value,
  onChange,
  address,
}: PropsWithChildren<{
  value: Asset;
  onChange: (value: Asset) => void;
  address?: Address<Prefix>;
  fee?: {
    amount: bigint;
    denom: TokenMinDenom;
  };
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

  const price = useTokenPrice(value.denom);

  const { balance, isFetching: isFetchingBalance } = useTokenBalance(
    address,
    value?.denom
  );

  const amountInUsd = price
    ? tokenToUSD(value.amount, Number(price), selectedToken.decimals)
    : null;

  const isFeeTokenAndSelectedTokenEqual = fee && fee.denom === value.denom;
  const maxAllowedTransferAmount = useMemo(() => {
    if (!balance) return 0n;
    if (isFeeTokenAndSelectedTokenEqual) {
      return max(balance.value - fee.amount, 0n);
    }
    return balance.value;
  }, [balance, fee, isFeeTokenAndSelectedTokenEqual]);
  return (
    <CryptoSelectorBox>
      <div className="flex justify-between">
        <CryptoSelectorDropdownBox>
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
            <CryptoSelector.Options
              className="left-0"
              label={t("transfer.section.token.label")}
            >
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
        </CryptoSelectorDropdownBox>
        <CryptoSelectorDropdownBox>
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
            <CryptoSelector.Options label={t("transfer.section.network.label")}>
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
        </CryptoSelectorDropdownBox>
      </div>
      <AmountInput
        value={value.amount}
        max={maxAllowedTransferAmount}
        onChange={(amount) => {
          onChange({
            ...value,
            amount,
          });
        }}
        decimals={selectedToken.decimals}
      />

      <CryptoSelectorBalanceBox>
        <div>{amountInUsd !== null && `≈${amountInUsd}`}</div>
        <div>
          {!balance && isFetchingBalance && (
            <CryptoSelectorBalanceText>
              {t("transfer.section.asset.balance.loading")}
            </CryptoSelectorBalanceText>
          )}
          {balance && (
            <>
              <div>
                <CryptoSelectorBalanceText>
                  {t("transfer.section.asset.balance")}{" "}
                </CryptoSelectorBalanceText>
                {balance?.formattedLong ?? "0"} {selectedToken.denom}
              </div>
            </>
          )}
        </div>
      </CryptoSelectorBalanceBox>
    </CryptoSelectorBox>
  );
};
