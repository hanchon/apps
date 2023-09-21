// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import React, { Dispatch, SetStateAction } from "react";
import { PrimaryButton, Subtitle, TextInput, Title } from "ui-helpers";
import { useTranslation } from "next-i18next";
import { useWalletAccountByPrefix } from "../hooks/useAccountByPrefix";
import { BackArrowIcon, RequestIcon } from "icons";
import { TokenAmount, TokenRef } from "evmos-wallet/src/registry-actions/types";
import { RequestModalProps } from "./RequestModal";
import { CLICK_ON_GENERATE_PAYMENT_REQUEST, useTracker } from "tracker";
import { RequestAssetSelector } from "./RequestAssetSelector";

const MAX_MESSAGE_LENGTH = 140;

export const SetUpContent = ({
  setState,
  token,
  setMessage,
  message,
  amount,
}: {
  message: string;
  token: TokenRef;
  amount: bigint;
  setMessage: Dispatch<SetStateAction<string>>;
  setState: RequestModalProps["setState"];
}) => {
  const { t } = useTranslation();
  const { sendEvent } = useTracker();

  const tokenAmount: TokenAmount = {
    ref: token,
    amount: amount,
  };

  const { data } = useWalletAccountByPrefix("evmos");

  const sender = data?.bech32Address;

  const disabled = amount == 0n || message?.length === 0;

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
                  step: "receive",
                }));
              }}
              className="text-pink-300"
            >
              <BackArrowIcon width={28} />
            </button>
            <div className="flex flex-col ">
              <Subtitle variant="modal-black">
                {t("transfer.section.asset")}
              </Subtitle>

              <RequestAssetSelector
                value={{
                  networkPrefix: "evmos",
                  ...tokenAmount,
                }}
                address={sender}
                onChange={(token) =>
                  setState((prev) => ({
                    ...prev,
                    token: token.ref,
                    amount: token.amount,
                  }))
                }
              />

              <div className="flex justify-between items-center">
                <Subtitle variant="modal-black">
                  {t("request.message.subtitle")}
                </Subtitle>
                <span className="text-xs md:text-sm font-light text-red">
                  {message.length}/{MAX_MESSAGE_LENGTH}
                </span>
              </div>

              <TextInput
                value={message}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                    setMessage(e.target.value);
                  }
                }}
                placeholder={t("request.message.input.placeholder")}
              />
            </div>
            <PrimaryButton
              disabled={disabled}
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  step: "share",
                }));
                sendEvent(CLICK_ON_GENERATE_PAYMENT_REQUEST);
              }}
              variant="primary-lg"
            >
              {t("request.generate.button")}
            </PrimaryButton>
          </div>
        </section>
      </form>
    </section>
  );
};
