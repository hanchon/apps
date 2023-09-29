// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CancelModal } from "./CancelModal";
import { TranslationContextProvider } from "schummar-translate/react";
import { EvmosCopilotIcon } from "icons";
import { t } from "../locales/translate";
import { useCopilot } from "./useCopilot";
import { IntroductionModal, ModalContainer } from "ui-helpers";

export const Content = () => {
  const { componentToDraw, stepsToDraw } = useCopilot();
  return (
    <>
      <CancelModal />
      <TranslationContextProvider locale="en">
        <ModalContainer
          introduction={
            <IntroductionModal
              icon={<EvmosCopilotIcon height={70} />}
              title={t("copilot.intro.title") as string}
              description={t("copilot.intro.description") as string}
              content={
                <ol className="space-y-3 pt-4 md:pt-0">{stepsToDraw}</ol>
              }
            />
          }
          content={componentToDraw?.component}
        />
      </TranslationContextProvider>
    </>
  );
};
