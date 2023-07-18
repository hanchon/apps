// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext } from "react";
import { ConfirmButton } from "ui-helpers";
import { StepsContext } from "../../container/StepsContext";
import { useEvmosBalance } from "./useEvmosBalance";
import { useTranslation } from "react-i18next";
export const SuccessTopUp = () => {
  const { updateStepsStatus } = useContext(StepsContext);
  // when evmosBalance is different that 0, show the component
  const { evmosBalance } = useEvmosBalance();

  const { t } = useTranslation();

  return (
    !evmosBalance.isZero() && (
      <div className="space-y-4 rounded-lg bg-[#F0FDF4] p-4">
        <div className="flex items-center space-x-3">
          <span
            role="img"
            aria-label="Celebration icon"
            className="flex h-5 w-5 items-center justify-center rounded-full border border-[#DFF2E5] bg-[#DFF2E5] p-4"
          >
            🎉
          </span>

          <div className="text-[#196235]">
            <h3 className="font-bold ">{t("topup.onborad.success.title")}</h3>
            <p className="text-sm">{t("topup.onborad.success.description")}</p>
          </div>
        </div>

        <ConfirmButton
          text="Next Steps"
          onClick={() => {
            updateStepsStatus();
          }}
          className="mt-0 w-auto font-normal normal-case"
        />
      </div>
    )
  );
};
