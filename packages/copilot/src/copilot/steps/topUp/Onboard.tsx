// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CheckIcon, CreditCardsIcon, EthereumIcon } from "icons";
import { SuccessTopUp } from "./SuccessTopUp";
import { TranslationContextProvider } from "schummar-translate/react";
import { t } from "../../../locales/translate";
import { Dispatch, SetStateAction } from "react";

export default function Onboard({
  topUpType,
  children,
  setTopUpType,
}: {
  topUpType: string;
  children: JSX.Element;
  setTopUpType: Dispatch<SetStateAction<string>>;
}) {
  return (
    <TranslationContextProvider locale="en">
      <section className="space-y-8">
        <div className="space-y-3">
          <h3 className="font-bold">{t("topup.onboard.title")}</h3>
          <div className="grid grid-cols-1 gap-4 text-sm font-medium md:grid-cols-2">
            <button
              onClick={() => setTopUpType("card")}
              className={`flex items-center justify-center gap-1 rounded-md px-3 py-1.5 ${
                topUpType === "card"
                  ? "border-red border-2"
                  : "border-strokeGrey border"
              }`}
            >
              <CreditCardsIcon />
              {t("topup.card.button")}
              {topUpType === "card" && (
                <div className="bg-red text-pearl flex h-5 w-5 items-center justify-center rounded-full">
                  <CheckIcon width={"14px"} height={"14px"} color="#fff" />
                </div>
              )}
            </button>
            <button
              onClick={() => setTopUpType("crypto")}
              className={`flex items-center justify-center gap-1 rounded-md px-3 py-1.5 ${
                topUpType === "crypto"
                  ? "border-red border-2"
                  : "border-strokeGrey border"
              }`}
            >
              <EthereumIcon />
              {t("topup.crypto.button")}
              {topUpType === "crypto" && (
                <div className="bg-red text-pearl flex h-5 w-5 items-center justify-center rounded-full">
                  <CheckIcon width={"14px"} height={"14px"} color="#fff" />
                </div>
              )}
            </button>
          </div>
        </div>
        <SuccessTopUp />
        {children}
      </section>
    </TranslationContextProvider>
  );
}
