// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EvmosCopilotWhiteIcon } from "icons";
import { useCopilotCard } from "./useCopilotCard";
import { TranslationContextProvider } from "schummar-translate/react";
import { t } from "../../locales/translate";

export const CopilotCard = () => {
  const { stepsToDraw, drawButton, sequence } = useCopilotCard();

  if (sequence) {
    return null;
  }
  return (
    <TranslationContextProvider locale="en">
      <div className="bg-red flex  flex-col justify-start space-y-6 rounded-lg bg-cover p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-pearl  text-2xl font-bold">
            {t("dappStore.onboard.title")}
          </h1>
          <EvmosCopilotWhiteIcon width={"50"} height={"50"} />
        </div>
        <ol className="mt-4 space-y-3 md:mt-0">{stepsToDraw}</ol>
        <div className="flex">{drawButton}</div>
      </div>
    </TranslationContextProvider>
  );
};
