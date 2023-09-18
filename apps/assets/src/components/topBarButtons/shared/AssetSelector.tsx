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
import { Address, getToken, getTokens, useTokenBalance } from "evmos-wallet";
import { CryptoSelectorTitle } from "ui-helpers";
import { useTranslation } from "next-i18next";
import { formatUnits } from "viem";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { max } from "helpers";

type Asset = {
  networkPrefix: Prefix;
  denom: TokenMinDenom;
  tokenSourcePrefix: Prefix;
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
  showNetworkSelector = true,
  showMax = true
}: PropsWithChildren<{
  value: Asset;
  onChange: (value: Asset) => void;
  address?: Address<Prefix>;
  fee?: {
    amount: bigint;
    denom: TokenMinDenom;
  };
  showNetworkSelector?: boolean;
  showMax?: boolean;
}>) => {
  const { t } = useTranslation();

  const selectedChain = chains[value.networkPrefix];

  const selectedToken = getToken(value.tokenSourcePrefix, value.denom);

  const tokenOptions = useMemo(() => {
    return getTokens().sort(({ denom: a }, { denom: b }) => (a > b ? 1 : -1));
  }, []);

  const networkOptions = useMemo(() => {
    if (selectedToken.sourcePrefix === "evmos")
      return Object.values(chains).map(({ prefix }) => prefix);

    return [selectedToken.sourcePrefix, "evmos"] as Prefix[];
  }, [selectedToken]);

  /**
   * When network changes, check if the selected token is available on the new network.
   * If not, set the first available token as the selected token.
   */
  useEffect(() => {
    if (tokenOptions.includes(getToken(value.tokenSourcePrefix, value.denom)))
      return;
    onChange({
      ...value,
      tokenSourcePrefix: tokenOptions[0].sourcePrefix,
      denom: tokenOptions[0].minCoinDenom,
    });
  }, [tokenOptions]);

  const price = useTokenPrice(value.denom);

  const { balance, isFetching: isFetchingBalance } = useTokenBalance(address, {
    minCoinDenom: value.denom,
    sourcePrefix: value.tokenSourcePrefix,
  });

  const amountInUsd = price
    ? tokenToUSD(value.amount, Number(price), selectedToken.decimals)
    : null;

  const isFeeTokenAndSelectedTokenEqual = fee && fee.denom === value.denom;
  const maxAllowedTransferAmount = useMemo(() => {
    if (!showMax) return undefined;
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
            value={selectedToken}
            onChange={(token) => {
              onChange({
                networkPrefix: token.sourcePrefix,
                tokenSourcePrefix: token.sourcePrefix,
                amount: 0n,
                denom: token.minCoinDenom,
              });
            }}
          >
            <CryptoSelector.Button
              src={`/assets/tokens/${selectedToken.denom}.png`}
              variant="black"
            >
              {selectedToken.denom.toLowerCase()}
            </CryptoSelector.Button>
            <CryptoSelector.Options
              variant="multiple"
              className="left-0"
              label={t("transfer.section.token.label")}
            >
              {tokenOptions.map((token) => {
                return (
                  <CryptoSelector.Option
                    src={`/assets/tokens/${token.denom}.png`}
                    key={`${token.sourcePrefix}-${token.minCoinDenom}`}
                    value={token}
                  >
                    {token.denom}
                  </CryptoSelector.Option>
                );
              })}
            </CryptoSelector.Options>
          </CryptoSelector>
        </CryptoSelectorDropdownBox>
        {showNetworkSelector &&
          <CryptoSelectorDropdownBox>
            <CryptoSelectorTitle>
              {t("transfer.section.asset.network")}
            </CryptoSelectorTitle>
            <CryptoSelector
              value={value.networkPrefix}
              onChange={(prefix) => {
                onChange({
                  ...value,
                  amount: 0n,
                  networkPrefix: prefix,
                });
              }}
            >
              <CryptoSelector.Button
                src={`/assets/chains/${value.networkPrefix}.png`}
              >
                {selectedChain.name}
              </CryptoSelector.Button>
              <CryptoSelector.Options
                label={t("transfer.section.network.label")}
                className="right-0"
              >
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
        }
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
      {/* TODO: show it when the user clicks on max amount */}
      {/* <ErrorMessage variant="info" displayIcon={false}>
        {t("message.gas.fee.reserved.amount")}
      </ErrorMessage> */}
      {/* TODO: show it when the balance is not enough. We are showing it below the sending 
      Remove that one and show it here. */}
      {/* <ErrorMessage displayIcon={false}>
        {t("message.insufficient.balance")}
      </ErrorMessage> */}
    </CryptoSelectorBox>
  );
};