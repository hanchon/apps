// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import React from "react";
import { PrimaryButton, Title } from "ui-helpers";
import { useTranslation } from "next-i18next";
import { EVMOS_PAGE_URL } from "constants-helper";

import { CopyPasteIcon, BackArrowIcon, RequestIcon } from "icons";
import { useWalletAccountByPrefix } from "../hooks/useAccountByPrefix";
import { tokenToUSD } from "../common/utils";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { AmountBox } from "../common/AmountBox";
import { TokenRef } from "evmos-wallet/src/registry-actions/types";
import { RequestModalProps } from "./RequestModal";
import {
  CLICK_ON_COPY_ICON_REQUEST_FLOW,
  CLICK_ON_SHARE_VIA_APP_REQUEST_FLOW,
  useTracker,
} from "tracker";
import { getTokenByRef } from "evmos-wallet/src/registry-actions/get-token-by-ref";
import QRCode from "react-qr-code";

export const ShareContent = ({
  message,
  token,
  setState,
  amount
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

  const shareURL = `${EVMOS_PAGE_URL}assets?action=pay&token=${token}&amount=${amount
    }&message=${message}&requester=${sender}`;

  return (
    <section className="space-y-3">
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
          <div className="flex flex-col gap-5">
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
              {/* To MrSir: add this event in the onclick: sendEvent(CLICK_ON_SHARE_QR_CODE_PAYMENT) */}
              <div className="bg-white p-2 w-44 h-44 rounded-xl self-center">
                <QRCode
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={shareURL}
                />
              </div>
              <span className="text-red text-xs self-center">
                Share Payment QR
              </span>
            </div>

            <div className="w-full rounded-md bg-gray-500 py-2 px-3 text-xs font-medium flex justify-between items-center space-x-5">
              <span className="text-sm overflow-hidden">
                {shareURL.substring(0, 40)}...
              </span>
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(shareURL);
                  sendEvent(CLICK_ON_COPY_ICON_REQUEST_FLOW);
                }}
                className=""
              >
                <CopyPasteIcon height={32} width={32} />
              </button>
            </div>

            <div className="flex gap-1 flex-col">
              <span className="text-gray-300 text-xs">Requesting:</span>
              <AmountBox
                amount={amount}
                token={selectedToken}
                amountInUsd={amountInUsd}
              />
            </div>

            <PrimaryButton
              // TODO: change variant to outline-primary if the user doesn't have enough balance to pay the fee
              // variant="outline-primary"
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
              className="w-full text-lg rounded-md capitalize mt-5"
            // TODO: we should change the message and the action depending if the user has enought balance to pay the fee or if we have to redirect them to axelar page
            // "transfer.swap.button.text" - "transfer.bridge.button.text"
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
