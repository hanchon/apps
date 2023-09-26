// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CreditCardsIcon, EthereumIcon } from "icons";
import { SuccessTopUp } from "./SuccessTopUp";
import { TranslationContextProvider } from "schummar-translate/react";
import { t } from "../../../locales/translate";
import { Dispatch, SetStateAction } from "react";
import { Tabs } from "ui-helpers";

const TOP_UP_TYPES = {
  CARD: "card",
  CRYPTO: "crypto",
};

export default function Onboard({
  topUpType,
  children,
  setTopUpType,
}: {
  topUpType: string;
  children: JSX.Element;
  setTopUpType: Dispatch<SetStateAction<string>>;
}) {
  const onboardProps = [
    {
      onClick: () => setTopUpType(TOP_UP_TYPES.CARD),
      icon: <CreditCardsIcon />,
      type: TOP_UP_TYPES.CARD,
      option: topUpType,
      text: t("topup.card.button") as string,
    },
    {
      onClick: () => setTopUpType(TOP_UP_TYPES.CRYPTO),
      icon: <EthereumIcon />,
      type: TOP_UP_TYPES.CRYPTO,
      option: topUpType,
      text: t("topup.crypto.button") as string,
    },
  ];

  return (
    <TranslationContextProvider locale="en">
      <section className="space-y-8">
        <div className="space-y-3">
          <h3 className="font-bold">{t("topup.onboard.title")}</h3>
          <Tabs tabsProps={onboardProps} />
        </div>
        <SuccessTopUp />
        {children}
      </section>
    </TranslationContextProvider>
  );
}
