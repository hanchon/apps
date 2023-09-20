// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import {
  ErrorMessage,
  IconContainer,
  Label,
  PrimaryButton,
  Subtitle,
  Title,
  InfoPanel,
} from "ui-helpers";
import { Trans, useTranslation } from "next-i18next";
import { Prefix, TokenAmount } from "evmos-wallet/src/registry-actions/types";
import { AssetSelector } from "../shared/AssetSelector";
import { useAccount } from "wagmi";
import {
  StoreType,
  WalletConnection,
  connectWith,
  getActiveProviderKey,
  getGlobalKeplrProvider,
  getPrefix,
  getToken,
} from "evmos-wallet";
import { AccountSelector } from "../shared/AccountSelector";

import { TransferSummary } from "../shared/TransferSummary";
import { SendIcon, WizardIcon } from "icons";
import { chains } from "@evmos-apps/registry";
import { E } from "helpers";
import { useRequestWalletAccount } from "../hooks/useAccountByPrefix";
import { getChainByAddress } from "evmos-wallet/src/registry-actions/get-chain-by-account";

import { ICONS_TYPES } from "constants-helper";
import { CopilotButton } from "copilot";
import { connectKeplr, installKeplr, reloadPage } from "./utils";
import { useDispatch, useSelector } from "react-redux";

import {
  CLICK_ON_AXL_REDIRECT,
  CLICK_ON_TOP_UP_EVMOS,
  INSUFFICIENT_FEE_AMOUNT,
  useTracker,
} from "tracker";
import { CLICK_ON_CONNECT_WITH_KEPLR_SEND_FLOW } from "tracker/src/constants";

import { sortedChains } from "../shared/sortedChains";
import { TransferModalProps } from "./TransferModal";
import { useReceiptModal } from "../receipt/ReceiptModal";
import { useTopupModal } from "../topup/TopupModal";
import { getAccount } from "wagmi/actions";
import { getTokenByRef } from "evmos-wallet/src/registry-actions/get-token-by-ref";
import { createPortal } from "react-dom";
import { useSend } from "../hooks/useSend";
import { getTokenValidDestinations } from "../shared/getTokenValidDestinations";
import { TransactionInspector } from "../shared/TransactionInspector";
export const TransferModalContent = ({
  receiver,
  networkPrefix,
  token: tokenRef,
  amount,
  setState,
}: TransferModalProps) => {
  const { t } = useTranslation();
  const { sendEvent } = useTracker();
  const { isDisconnected } = useAccount();
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();

  const receiptModal = useReceiptModal();
  const topupModal = useTopupModal();

  const tokenAmount: TokenAmount = {
    ref: tokenRef,
    amount: amount,
  };

  const {
    account,
    error: walletRequestError,
    requestAccount,
  } = useRequestWalletAccount();

  useEffect(() => {
    if (networkPrefix !== "evmos" && getActiveProviderKey() !== "keplr") return;
    requestAccount(networkPrefix);
  }, [networkPrefix, getAccount().address]);

  const sender = account?.bech32Address;
  const {
    isTransferring,
    isReady: isReadyToTransfer,
    transfer,
    transferResponse,
    validation,
    fee,
    feeBalance,
    isPreparing,
    feeToken,
    __DEBUG__,
  } = useSend({
    sender,
    receiver,
    token: tokenAmount,
  });

  const token = getTokenByRef(tokenRef);
  const senderChain = sender ? getChainByAddress(sender) : chains["evmos"];
  const tokenChain = chains[token.sourcePrefix];

  const destinationNetworkOptions = useMemo(
    (): Prefix[] => //
      getTokenValidDestinations(tokenAmount.ref, senderChain.prefix),
    [tokenAmount.ref, senderChain.prefix],
  );

  const activeProviderKey = getActiveProviderKey();

  const disabledDestinationNetworkOptions = useMemo((): Prefix[] => {
    // If asset is being held on an EVMOS ACCOUNT and the user is using MetaMask
    if (senderChain.prefix === "evmos" && activeProviderKey === "metaMask") {
      // disable all chains expect evmos
      if (tokenChain.prefix === "evmos") {
        return sortedChains.filter((chain) => chain !== "evmos");
      }
      // disable native network
      return [tokenChain.prefix];
    }

    // all enabled.
    return [];
  }, [senderChain, tokenChain, activeProviderKey]);

  const senderValidation = {
    userRejectedEnablingNetwork: E.match.byPattern(
      walletRequestError,
      /USER_REJECTED_REQUEST/,
    ),
    networkNotSupportedByConnectedWallet:
      activeProviderKey &&
      activeProviderKey !== "keplr" &&
      networkPrefix !== "evmos",
  };

  useEffect(() => {
    installKeplr();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && reloadPage()) {
        installKeplr();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!transferResponse) return;

    receiptModal.setIsOpen(true, {
      hash: transferResponse.hash,
      chainPrefix: networkPrefix,
    });
  }, [transferResponse]);

  const action = useMemo(() => {
    if (isDisconnected) return "CONNECT";

    if (
      token.ref === "evmos:EVMOS" &&
      !validation.hasSufficientBalance &&
      !isPreparing
    )
      return "TOPUP";
    if (
      fee &&
      fee.token.ref === "evmos:EVMOS" &&
      !validation.hasSufficientBalanceForFee &&
      !isPreparing
    )
      return "TOPUP";

    if (token.handledByExternalUI !== null) return "BRIDGE";

    return "TRANSFER";
  }, [
    token,
    isDisconnected,
    validation.hasSufficientBalance,
    validation.hasSufficientBalanceForFee,
    fee?.token.ref,
  ]);

  useEffect(() => {
    if (!validation.hasSufficientBalanceForFee && !isPreparing)
      sendEvent(INSUFFICIENT_FEE_AMOUNT);
  }, [validation.hasSufficientBalanceForFee, isPreparing]);
  return (
    <section className="space-y-8 w-full">
      <Title
        variant="modal-black"
        icon={<SendIcon className="text-pink-300" />}
      >
        {t("transfer.title")}
      </Title>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (action === "TOPUP") {
            topupModal.setIsOpen(true);
            sendEvent(CLICK_ON_TOP_UP_EVMOS);
            return;
          }

          if (action === "BRIDGE") {
            const target = token.handledByExternalUI?.[0].url;
            if (!target) return;
            window.open(target, "_blank");
            sendEvent(CLICK_ON_AXL_REDIRECT);
            return;
          }

          if (action === "CONNECT") {
            return;
          }

          transfer();
        }}
      >
        <section className="space-y-8">
          <div>
            <Subtitle variant="modal-black">
              {t("transfer.section.asset")}
            </Subtitle>
            <AssetSelector
              value={{
                networkPrefix,
                ...tokenAmount,
              }}
              address={sender}
              fee={fee?.token}
              onChange={(token) => {
                setState((prev) => ({
                  ...prev,
                  networkPrefix: token.networkPrefix,
                  amount: token.amount,
                  token: token.ref,
                }));
              }}
            />

            {/* TODO: Some error messages. This is not in the specs, so we need to check with Mian how to display those */}
            {senderValidation.userRejectedEnablingNetwork && (
              <InfoPanel icon={<WizardIcon className="shrink-0" />}>
                <div className="space-y-2 md:space-y-4">
                  <p>
                    <Trans
                      i18nKey="error.user.rejected.network.title"
                      components={{
                        strong: <span className="text-pink-300" />,
                      }}
                    />
                    <span className="text-pink-300">
                      {chains[networkPrefix].name}
                    </span>
                    <Trans
                      i18nKey="error.user.rejected.network.title2"
                      components={{
                        strong: <span className="text-pink-300" />,
                      }}
                    />
                  </p>

                  <p>
                    <Trans
                      i18nKey="error.user.rejected.network.subtitle"
                      components={{
                        strong: <span className="text-pink-300" />,
                      }}
                    />
                  </p>
                  <PrimaryButton
                    className="font-normal w-full"
                    onClick={() => requestAccount(networkPrefix)}
                  >
                    {t("error.user.rejected.network.authorizeButtonLabel")}
                  </PrimaryButton>
                </div>
              </InfoPanel>
            )}
            {senderValidation.networkNotSupportedByConnectedWallet && (
              <InfoPanel icon={<IconContainer type={ICONS_TYPES.METAMASK} />}>
                <div className="space-y-2 md:space-y-4">
                  <p>
                    <Trans
                      i18nKey="error.network.not.support.by-wallet.title"
                      components={{
                        strong: <span className="text-pink-300" />,
                      }}
                    />
                  </p>
                  <p>
                    <Trans
                      i18nKey="error.network.not.support.by-wallet.subtitle"
                      components={{
                        strong: <span className="text-pink-300" />,
                      }}
                    />
                  </p>
                  <PrimaryButton
                    variant={
                      getGlobalKeplrProvider() === null
                        ? "outline-primary"
                        : "primary"
                    }
                    className="font-normal w-full"
                    // TODO: If the user rejects the connection, it's connecting with MetaMask. Check why.
                    onClick={async () => {
                      if (getGlobalKeplrProvider() === null) {
                        connectKeplr();
                        return;
                      }
                      const [err] = await E.try(() => connectWith("keplr"));
                      sendEvent(CLICK_ON_CONNECT_WITH_KEPLR_SEND_FLOW);
                      // TODO: handle error when user rejects the connection
                      if (err) return false;
                    }}
                  >
                    {getGlobalKeplrProvider() === null
                      ? t(
                        "error.network.not.support.by-wallet.installButtonLabel",
                      )
                      : t(
                        "error.network.not.support.by-wallet.connectButtonLabel",
                      )}
                  </PrimaryButton>
                </div>
              </InfoPanel>
            )}
          </div>
          <div>
            <Subtitle variant="modal-black">
              {t("transfer.section.to")}
            </Subtitle>
            <AccountSelector
              value={receiver}
              onChange={(receiver) =>
                setState((prev) => ({ ...prev, receiver }))
              }
              networkOptions={destinationNetworkOptions}
              disabledNetworkOptions={disabledDestinationNetworkOptions}
            />
            {sender && receiver && amount !== 0n && (
              <div className="space-y-3 mt-8">
                <Label>{t("transfer.section.summary.title")}</Label>
                <TransferSummary
                  sender={sender}
                  receiver={receiver}
                  token={{
                    ...tokenAmount,
                    networkPrefix: senderChain.prefix,
                  }}
                  disabled={!isReadyToTransfer}
                />
              </div>
            )}

            {/* {!validation.hasSufficientBalanceForFee && feeBalance && (
            <ErrorMessage className="justify-center pl-0">
              {t("message.insufficiente.fee")}
              {feeBalance.formattedLong} {feeBalance.symbol}
            </ErrorMessage>
          )} */}

            {/*
             * Call to action Buttons
             */}
            {action === "CONNECT" && (
              <>
                <ErrorMessage
                  className="justify-center pl-0 mb-4"
                  variant="info"
                >
                  <p className="pb-1"> {t("error.getting.balance")}</p>
                  <Trans
                    i18nKey="error.getting.balance.connect.wallet"
                    components={{
                      strong: <span className="text-pink-300" />,
                    }}
                  />
                </ErrorMessage>
                <WalletConnection
                  copilotModal={({
                    beforeStartHook,
                  }: {
                    beforeStartHook: Dispatch<SetStateAction<boolean>>;
                  }) => <CopilotButton beforeStartHook={beforeStartHook} />}
                  dispatch={dispatch}
                  walletExtension={wallet}
                  variant="outline-primary"
                />
              </>
            )}

            {action === "TOPUP" && (
              <>
                {!validation.hasSufficientBalanceForFee && (
                  <ErrorMessage className="justify-center pl-0">
                    {t("message.insufficiente.fee")}
                    {feeBalance?.formatted ?? 0} {feeToken?.symbol}
                  </ErrorMessage>
                )}
                <PrimaryButton
                  type="submit"
                  variant={"outline-primary"}
                  className="w-full text-base md:text-lg rounded-md capitalize mt-8"
                >
                  {t("transfer.top.up.button.text")}
                </PrimaryButton>
              </>
            )}
            {action === "BRIDGE" && (
              <>
                <ErrorMessage className="justify-center pl-0" variant="info">
                  <Trans
                    i18nKey="error.send.axelar.assets.text"
                    components={{
                      strong: <span className="text-pink-300" />,
                    }}
                  />
                </ErrorMessage>
                <PrimaryButton
                  type="submit"
                  variant={"outline-primary"}
                  className="w-full text-base md:text-lg rounded-md capitalize mt-8"
                >
                  {t("transfer.bridge.button.text")}
                </PrimaryButton>
              </>
            )}
            {action === "TRANSFER" && (
              <PrimaryButton
                type="submit"
                className="w-full text-base md:text-lg rounded-md capitalize mt-8"
                disabled={!isReadyToTransfer || isTransferring || !!(transferResponse?.hash)}
              >
                {t("transfer.send.button.text")}
              </PrimaryButton>
            )}
          </div>
          {isTransferring && (
            <p>Please, check your wallet to sign your transaction</p>
          )}
        </section>
      </form>

      {typeof document !== "undefined" &&
        process.env.NODE_ENV === "development" &&
        createPortal(<TransactionInspector {...__DEBUG__} />, document.body)}
    </section>
  );
};
