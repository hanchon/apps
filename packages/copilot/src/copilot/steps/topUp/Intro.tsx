// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, SetStateAction } from "react";
import { CreditCardsIcon, EthereumIcon } from "icons";
import { CLICK_ON_TOP_UP_WITH_CARD_COPILOT, useTracker } from "tracker";
import { TranslationContextProvider } from "schummar-translate/react";
import { t } from "../../../locales/translate";
export const Intro = ({
  setTopUpType,
}: {
  setTopUpType: Dispatch<SetStateAction<string>>;
}) => {
  const { handlePreClickAction } = useTracker(
    CLICK_ON_TOP_UP_WITH_CARD_COPILOT
  );

  const handleCardOnClick = () => {
    setTopUpType("card");
    handlePreClickAction();
  };

  return (
    <TranslationContextProvider locale="en">
      <section className="space-y-10">
        <div className="space-y-3">
          <h3 className="font-bold">{t("topup.intro.title")}</h3>
          <p className="text-sm text-gray1">{t("topup.intro.body")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 font-medium md:grid-cols-2 md:text-sm">
          <button
            onClick={handleCardOnClick}
            className="flex items-center justify-center gap-2 rounded-lg border border-strokeGrey py-4 px-2 shadow transition-all duration-300 hover:shadow-md"
          >
            <CreditCardsIcon />
            {t("topup.card.button")}
          </button>
          <button
            disabled={true}
            className="flex flex-col items-center gap-2 rounded-lg border border-strokeGrey bg-[#F3F3F3] py-4 px-2 opacity-50"
          >
            <div className="flex  items-center justify-center gap-2">
              <EthereumIcon />
              {t("topup.crypto.button")}
            </div>
            <span className="rounded-full bg-strokeGrey px-3 py-0.5 font-normal">
              {t("topup.intro.crypto.button.comingsoon")}
            </span>
          </button>
        </div>
      </section>
    </TranslationContextProvider>
  );
};
