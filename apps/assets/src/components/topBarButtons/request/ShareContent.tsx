// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import React from "react";
import { Label, PrimaryButton, TextInput, Title } from "ui-helpers";
import { useTranslation } from "next-i18next";
import { EVMOS_PAGE_URL } from "constants-helper";
import { BackArrowIcon, RequestIcon, ShareIcon } from "icons";
import { useWalletAccountByPrefix } from "../hooks/useAccountByPrefix";
import { tokenToUSD } from "../common/utils";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { AmountBox } from "../common/AmountBox";
import { TokenRef } from "evmos-wallet/src/registry-actions/types";
import { RequestModalProps } from "./RequestModal";
import {
  CLICK_ON_COPY_ICON_REQUEST_FLOW,
  CLICK_ON_SHARE_QR_CODE_PAYMENT,
  CLICK_ON_SHARE_VIA_APP_REQUEST_FLOW,
  useTracker,
} from "tracker";
import { getTokenByRef } from "evmos-wallet/src/registry-actions/get-token-by-ref";
import QRCode from "react-qr-code";

export const ShareContent = ({
  message,
  token,
  setState,
  amount,
}: {
  message: string;
  token: TokenRef;
  amount: bigint;
  setState: RequestModalProps["setState"];
}) => {
  const { t } = useTranslation();
  const { sendEvent } = useTracker();

  const { data } = useWalletAccountByPrefix("evmos");

  const sender = data?.bech32Address;

  const shareEnabled = navigator.share !== undefined;

  const price = useTokenPrice(token);
  const selectedToken = getTokenByRef(token);
  const amountInUsd = price
    ? tokenToUSD(amount, Number(price), selectedToken.decimals)
    : null;

  const shareURL = `${EVMOS_PAGE_URL}assets?action=pay&token=${token}&amount=${amount}&message=${message}&requester=${sender}`;

  return (
    <section className="space-y-8">
      <Title
        variant="modal-black"
        icon={<RequestIcon className="text-pink-300" />}
      >
        {t("request.title")}
      </Title>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <section>
          <div className="flex flex-col gap-8">
            <button
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  step: "setup",
                }));
              }}
              className="text-pink-300"
            >
              <BackArrowIcon width={28} />
            </button>
            <div className="flex gap-2 flex-col">
              {/* eslint-disable-next-line no-secrets/no-secrets */}
              {/* To MrSir: add this event in the onclick: sendEvent(CLICK_ON_SHARE_QR_CODE_PAYMENT) */}

              <div className="bg-white p-2 w-44 h-44 rounded-xl self-center">
                <QRCode
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={shareURL}
                />
              </div>
              {shareEnabled &&
                <button
                  onClick={async () => {
                    await navigator.share({
                      url: shareURL,
                      title: "Payment Link",
                    });
                    sendEvent(CLICK_ON_SHARE_QR_CODE_PAYMENT);
                  }}
                  className="flex items-center space-x-2 self-center">
                  <span className="text-pink-300 text-xs md:text-sm ">
                    {t("request.share.payment.qr")}
                  </span>
                  <ShareIcon className="w-3 h-4 md:w-5 md:h-4" />
                </button>
              }
            </div>

            <TextInput
              value={`${shareURL.substring(0, 40)}...`}
              disabled={true}
              showCopyIcon={true}
              onClickCopy={async () => {
                await navigator.clipboard.writeText(shareURL);
                sendEvent(CLICK_ON_COPY_ICON_REQUEST_FLOW);
              }}
            />

            <div className="flex flex-col">
              <Label>{t("request.label")}</Label>
              <AmountBox
                amount={amount}
                token={selectedToken}
                amountInUsd={amountInUsd}
              />
            </div>

            <PrimaryButton
              onClick={async () => {
                sendEvent(CLICK_ON_SHARE_VIA_APP_REQUEST_FLOW);
                if (shareEnabled) {
                  await navigator.share({
                    url: shareURL,
                    title: "Payment Link",
                  });
                } else {
                  await navigator.clipboard.writeText(
                    `Hi could you please transfer "${message}" using this payment link:\n\n${shareURL}}`,
                  );
                }
              }}
              variant="primary-lg"
            >
              {shareEnabled
                ? t("request.share.button")
                : t("request.copy.button")}
            </PrimaryButton>
          </div>
        </section>
      </form>
    </section>
  );
};
