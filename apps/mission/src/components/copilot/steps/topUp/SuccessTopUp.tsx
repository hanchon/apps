// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext } from "react";
import { StepsContext } from "../../container/StepsContext";
import { useEvmosBalance } from "./useEvmosBalance";
import { useTranslation } from "react-i18next";
import { CLICK_ON_NEXT_STEPS_COPILOT, useTracker } from "tracker";

export const SuccessTopUp = () => {
  const { updateStepsStatus } = useContext(StepsContext);
  // when evmosBalance is different that 0, show the component
  const { evmosBalance } = useEvmosBalance();

  const { t } = useTranslation();
  const { handlePreClickAction } = useTracker(CLICK_ON_NEXT_STEPS_COPILOT);

  const handleOnClick = () => {
    updateStepsStatus();
    handlePreClickAction();
  };

  return evmosBalance.isZero() ? (
    <></>
  ) : (
    <div className="space-y-4 rounded-lg bg-[#F0FDF4] p-4">
      <div className=" flex items-start space-x-3">
        <span
          role="img"
          aria-label="Celebration icon"
          className="relative top-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#DFF2E5] bg-[#DFF2E5] p-4"
        >
          🎉
        </span>

        <div className="text-[#196235]">
          <h3 className="font-bold ">{t("topup.onboard.success.title")}</h3>
          <p className="text-sm">{t("topup.onboard.success.description")}</p>
          <button
            onClick={handleOnClick}
            // TODO: create reusable component
            className="mt-3 w-auto space-x-2 rounded-lg bg-red
            px-8 py-2 font-normal  normal-case text-pearl shadow transition-all duration-300 hover:bg-red1 hover:shadow-md "
          >
            {t("topup.onboard.success.button.text")}
          </button>
        </div>
      </div>
    </div>
  );
};
