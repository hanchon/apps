// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import React, { useEffect, useMemo } from "react";
import {
  ErrorMessage,
  Label,
  PrimaryButton,
  Subtitle,
  Title,
} from "ui-helpers";
import { useTranslation } from "next-i18next";
import { Prefix, TokenMinDenom } from "evmos-wallet/src/registry-actions/types";
import { AssetSelector } from "../parts/AssetSelector";
import { useAccount } from "wagmi";
import {
  connectWith,
  getPrefix,
  getPrefixes,
  getTokenByDenom,
  getTokenMinDenomList,
  isValidCosmosAddress,
  isValidHexAddress,
  normalizeToCosmosAddress,
  useAccountExists,
  useFee,
  useTokenBalance,
} from "evmos-wallet";
import { AccountSelector } from "../parts/AccountSelector";
import { useModalState } from "../hooks/useModal";
import { TransferSummary } from "../parts/TransferSummary";
import { SendIcon } from "icons";
import { z } from "zod";
import { chains } from "@evmos-apps/registry";
import { E } from "helpers";
import { useWalletAccountByPrefix } from "../hooks/useAccountByPrefix";
import { getChainByTokenDenom } from "evmos-wallet/src/registry-actions/get-chain-by-token-min-denom";
import { getChainByAddress } from "evmos-wallet/src/registry-actions/get-chain-by-account";

const TransferModalSchema = z.object({
  receiver: z.string().transform((v) => {
    if (isValidHexAddress(v) || isValidCosmosAddress(v, [...getPrefixes()])) {
      return v;
    }
    return undefined;
  }),
  chainPrefix: z.custom<Prefix>((v) => {
    if (Object.keys(chains).includes(v as Prefix)) {
      return v;
    }
    return undefined;
  }),
  denom: z.custom<TokenMinDenom>((v) => {
    if (getTokenMinDenomList().includes(v as TokenMinDenom)) {
      return v;
    }
    return undefined;
  }),
  amount: z.coerce.bigint().default(0n),
});

export const Content = () => {
  const { t } = useTranslation();

  const {
    state: { receiver, ...token },
    setState,
  } = useModalState("transfer", TransferModalSchema, {
    chainPrefix: "evmos",
    denom: "aevmos",
    amount: 0n,
  });

  const { connector } = useAccount();
  const {
    data,
    error: walletRequestError,
    refetch,
  } = useWalletAccountByPrefix(token.chainPrefix);

  const sender = data?.bech32Address;

  const { data: accountExists } = useAccountExists(sender);

  const { fee, error: feeError } = useFee({
    sender,
    receiverChainPrefix: receiver ? getPrefix(receiver) : "evmos",
    denom: token.denom,
  });

  const { balance } = useTokenBalance(sender, token.denom);
  const feeChainNativeCurrency = chains[token.chainPrefix].nativeCurrency;
  const feeToken = getTokenByDenom(feeChainNativeCurrency);

  const { balance: feeTokenbalance } = useTokenBalance(
    sender,
    feeToken.minCoinDenom
  );

  /**
   * Centralizing errors
   * We could consider moving this out of the component if it's starts to grow too much
   */
  const errors = useMemo(() => {
    const errors = new Set<
      | "accountDoesntExist"
      | "insufficientBalance"
      | "insufficientBalanceForFee"
      | "userRejectedEnablingNetwork"
      | "networkNotSupportedByConnectedWallet"
    >();

    /**
     * Account doesn't exist
     */
    if (accountExists === false) {
      errors.add("accountDoesntExist");
    }

    /**
     * Balance checks
     */
    const isFeeTokenAndSelectedTokenEqual =
      fee && fee.token.denom === token.denom;

    if (
      accountExists === false ||
      // Checks if the balance is 0 (undefined means balance might be loading so it's not an error)
      balance?.value === 0n ||
      // Checks if the balance is enough to pay for transfer and fee
      (balance &&
        isFeeTokenAndSelectedTokenEqual &&
        fee.token.amount + token.amount > balance.value) ||
      // check if balance is enough without considering fee (when fee is paid in a different token)
      (balance && token.amount > balance.value)
    ) {
      errors.add("insufficientBalance");
    }

    /**
     * Balance check exclusive for fee token
     * Note: The simulation will fail if the user doesn't have enough balance to pay the fee
     * so we will not even know how much the fee would be to begin with
     *
     * so we only check if the balance is 0
     */
    if (feeTokenbalance?.value === 0n) {
      errors.add("insufficientBalanceForFee");
    }
    /**
     * Wallet checks
     */
    if (E.match.byPattern(walletRequestError, /USER_REJECTED_REQUEST/)) {
      errors.add("userRejectedEnablingNetwork");
    }

    if (
      E.match.byPattern(walletRequestError, /NETWORK_NOT_SUPPORTED_BY_WALLET/)
    ) {
      errors.add("networkNotSupportedByConnectedWallet");
    }

    return errors;
  }, [
    balance,
    fee,
    feeError,
    walletRequestError,
    feeTokenbalance,
    accountExists,
    token,
  ]);

  return (
    <section className="space-y-3 w-full">
      <Title variant="modal-black" icon={<SendIcon />}>
        {t("transfer.title")}
      </Title>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <section>
          <Subtitle variant="modal-black">
            {t("transfer.section.asset")}
          </Subtitle>
          <AssetSelector
            value={token}
            address={sender}
            fee={fee?.token}
            onChange={(token) =>
              setState((prev) => ({
                ...prev,
                ...token,
              }))
            }
          />

          {/* TODO: Some error messages. This is not in the specs, so we need to check with Mian how to display those */}
          {errors.has("userRejectedEnablingNetwork") && (
            <div className="text-center text-sm space-y-2">
              <p>
                I see you're trying to send tokens from{" "}
                <strong>{chains[token.chainPrefix].name}</strong> using{" "}
                {connector?.name}.
              </p>
              <p>
                For that we need access to your account address. If you want to
                proceed with this transaction, please authorize the request in
                your wallet.
              </p>
              <button
                className="bg-gray-500 text-white rounded-md px-3 py-2"
                onClick={() => refetch()}
              >
                Try again
              </button>
            </div>
          )}
          {errors.has("networkNotSupportedByConnectedWallet") && (
            <div className="text-center text-sm space-y-2">
              <p>
                I see you're trying to send tokens from{" "}
                <strong>{chains[token.chainPrefix].name}</strong> using{" "}
                {connector?.name}.
              </p>
              <p>
                Currently, only Keplr supports supports sending tokens from
                other networks than Evmos.
              </p>
              <button
                className="bg-gray-500 text-white rounded-md px-3 py-2"
                onClick={() => connectWith("keplr")}
              >
                Connect with Keplr
              </button>
            </div>
          )}
          {errors.has("accountDoesntExist") && (
            <div className="text-center text-sm space-y-2">
              <p>
                The connected account doesn't have a balance in the selected
                network.
              </p>
              <p>
                It also seems it has never been used in{" "}
                <strong>{chains[token.chainPrefix].name}</strong> network, are
                you sure you're connected to the right account?
              </p>
            </div>
          )}

          <Subtitle variant="modal-black">{t("transfer.section.to")}</Subtitle>
          <AccountSelector
            value={receiver}
            onChange={(receiver) => setState((prev) => ({ ...prev, receiver }))}
          />

          {sender && receiver && (
            <div className="space-y-3">
              <Label>{t("transfer.section.summary.title")}</Label>
              <TransferSummary
                sender={sender}
                receiver={receiver}
                token={token}
              />
            </div>
          )}
          {/* TODO: this should appear when we add the opacity to the transfer summary because the user doesn't have enough evmos to pay the fee */}
          {errors.has("insufficientBalance") && (
            <ErrorMessage className="text-center pl-0">
              {t("transfer.section.summary.error.insufficient.balance")}{" "}
              {balance?.formattedLong ?? "0"} {token.denom}
            </ErrorMessage>
          )}
          {errors.has("insufficientBalanceForFee") && feeTokenbalance && (
            <ErrorMessage className="text-center pl-0">
              {/* TODO: the message might be different if the insufficient token is the fee token? */}
              {t("transfer.section.summary.error.insufficient.balance")}{" "}
              {feeTokenbalance.formattedLong} {feeTokenbalance.denom}
            </ErrorMessage>
          )}

          <PrimaryButton
            // TODO: change variant to outline-primary if the user doesn't have enough balance to pay the fee
            // variant="outline-primary"
            onClick={() => {}}
            className="w-full text-lg rounded-md capitalize mt-5"
            disabled={errors.size > 0 || !sender || !receiver}
            // TODO: we should change the message and the action depending if the user has enought balance to pay the fee or if we have to redirect them to axelar page
            // "transfer.swap.button.text" - "transfer.bridge.button.text"
          >
            {t("transfer.send.button.text")}
          </PrimaryButton>
        </section>
      </form>
    </section>
  );
};
