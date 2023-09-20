import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  AmountInput,
  CryptoSelectorBalanceBox,
  CryptoSelectorBalanceText,
  CryptoSelectorBox,
  CryptoSelectorDropdownBox,
  ErrorMessage,
} from "ui-helpers";
import { chains } from "@evmos-apps/registry";
import { Prefix, TokenAmount, TokenMinDenom } from "evmos-wallet/src/registry-actions/types";
import { CryptoSelector } from "ui-helpers";
import { Address, getToken, getTokens, useTokenBalance } from "evmos-wallet";
import { CryptoSelectorTitle } from "ui-helpers";
import { useTranslation } from "next-i18next";
import { formatUnits } from "viem";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { max } from "helpers";
import { useTracker } from "tracker";
import {
  SELECT_FROM_NETWORK_SEND_FLOW,
  SELECT_TOKEN_SEND_FLOW,
} from "tracker/src/constants";
import { useAccount } from "wagmi";
import { getTokenByRef } from "evmos-wallet/src/registry-actions/get-token-by-ref";

type Asset = {
  networkPrefix: Prefix;
} & TokenAmount

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
  showMax = true,
}: PropsWithChildren<{
  value: Asset;
  onChange: (value: Asset) => void;
  address?: Address<Prefix>;
  fee?: TokenAmount;
  showNetworkSelector?: boolean;
  showMax?: boolean;
}>) => {
  const { t } = useTranslation();
  const { sendEvent } = useTracker();
  const { isDisconnected } = useAccount();
  const selectedChain = chains[value.networkPrefix];

  const selectedToken = getTokenByRef(value.ref);

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
    if (tokenOptions.includes(selectedToken))
      return;
    const [firstAvailableToken] = tokenOptions;
    onChange({
      ...value,
      ref: firstAvailableToken.ref,
      networkPrefix: firstAvailableToken.sourcePrefix,
    });
  }, [tokenOptions, selectedToken]);

  const price = useTokenPrice(value.ref);

  const { balance, isFetching: isFetchingBalance } = useTokenBalance(address, value.ref);

  const amountInUsd = price
    ? tokenToUSD(value.amount, Number(price), selectedToken.decimals)
    : null;

  const isFeeTokenAndSelectedTokenEqual = fee && fee.ref === value.ref;
  const maxAllowedTransferAmount = useMemo(() => {
    if (!showMax) return undefined;
    if (!balance) return 0n;
    if (isFeeTokenAndSelectedTokenEqual) {
      return max(balance.value - fee.amount, 0n);
    }
    return balance.value;
  }, [balance, fee, isFeeTokenAndSelectedTokenEqual]);

  const inssuficientBalance = isFetchingBalance === false && !balance || balance?.value === 0n
  const [isMaxClicked, setIsMaxClicked] = useState(false);
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
              console.log(token.ref)
              onChange({
                networkPrefix: token.sourcePrefix,
                ref: token.ref,
                amount: 0n,
              });
              sendEvent(SELECT_TOKEN_SEND_FLOW, {
                "token selected": token.name,
              });
              sendEvent(SELECT_FROM_NETWORK_SEND_FLOW, {
                network: token.sourcePrefix,
              });
              setIsMaxClicked(false);
            }}
          >
            <CryptoSelector.Button
              src={`/assets/tokens/${selectedToken.denom}.png`}
              variant="black"
            >
              {selectedToken.symbol.toLowerCase()}
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
                sendEvent(SELECT_FROM_NETWORK_SEND_FLOW, {
                  network: value.networkPrefix,
                });
                setIsMaxClicked(false);
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
        variant={inssuficientBalance ? "error" : isMaxClicked ? "info" : "default"}
        value={value.amount}
        max={maxAllowedTransferAmount}
        onChange={(amount) => {
          onChange({
            ...value,
            amount,
          });
        }}
        decimals={selectedToken.decimals}
        setIsMaxClicked={setIsMaxClicked}
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
                {balance?.formatted ?? "0"}
              </div>
            </>
          )}

          {isDisconnected && (
            <CryptoSelectorBalanceText>
              {t("transfer.section.asset.balance")}{" "}
              {t("transfer.section.asset.balance.error")}
            </CryptoSelectorBalanceText>
          )}
        </div>
      </CryptoSelectorBalanceBox>
      {isMaxClicked && (
        <ErrorMessage variant="info" displayIcon={false}>
          {t("message.gas.fee.reserved.amount")}
        </ErrorMessage>
      )}
      {inssuficientBalance && (
        <ErrorMessage displayIcon={false}>
          {t("message.insufficient.balance")}
        </ErrorMessage>
      )}
    </CryptoSelectorBox>
  );
};




