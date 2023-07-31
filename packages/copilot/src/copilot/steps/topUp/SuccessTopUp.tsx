// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext } from "react";
import { StepsContext } from "../../container/StepsContext";
import { useEvmosBalance } from "./useEvmosBalance";
import { CLICK_ON_NEXT_STEPS_COPILOT, useTracker } from "tracker";
import { TranslationContextProvider } from "schummar-translate/react";
import { t } from "../../../locales/translate";
import { PrimaryButton } from "../../PrimaryButton";
import { Confetti } from "../icons/ConfettiEmoji";

export const SuccessTopUp = () => {
  const { updateStepsStatus } = useContext(StepsContext);
  // when evmosBalance is different that 0, show the component
  const { evmosBalance } = useEvmosBalance();

  const { handlePreClickAction } = useTracker(CLICK_ON_NEXT_STEPS_COPILOT);

  const handleOnClick = () => {
    updateStepsStatus();
    handlePreClickAction();
  };

  return evmosBalance.isZero() ? (
    <></>
  ) : (
    <TranslationContextProvider locale="en">
      <div className="space-y-4 rounded-lg bg-lightYellow2 p-4">
        <div className=" flex items-start space-x-3">
          <span
            role="img"
            aria-label="Confetti icon"
            className="relative top-1 flex h-5 w-5 items-center justify-center rounded-full border border-lightYellow3 bg-lightYellow3 p-4"
          >
            {Confetti}
          </span>

          <div className="text-[#196235]">
            <h3 className="font-bold ">{t("topup.onboard.success.title")}</h3>
            <p className="text-sm">{t("topup.onboard.success.description")}</p>
            <PrimaryButton
              onClick={handleOnClick}
              text={t("topup.onboard.success.button.text") as string}
              className="mt-3 ml-0"
            />
          </div>
        </div>
      </div>
    </TranslationContextProvider>
  );
};
