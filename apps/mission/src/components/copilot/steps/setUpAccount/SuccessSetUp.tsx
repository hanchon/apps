// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ConfirmButton } from "ui-helpers";
import ConfettiExplosion from "react-confetti-explosion";
import { useContext } from "react";
import { StepsContext } from "../../container/StepsContext";
import { useTranslation } from "react-i18next";
import { CLICK_ON_TOP_UP_YOUR_ACCOUNT_COPILOT, useTracker } from "tracker";
export const SuccessSetUp = () => {
  const { updateStepsStatus } = useContext(StepsContext);
  const { handlePreClickAction } = useTracker(
    CLICK_ON_TOP_UP_YOUR_ACCOUNT_COPILOT
  );

  const handleClick = () => {
    updateStepsStatus();
    handlePreClickAction();
  };

  const { t } = useTranslation();
  return (
    <section className=" h-full w-full space-y-3 overflow-hidden text-center">
      <p className="mb-4 text-9xl">👏</p>
      <h6 className="font-bold">{t("setupaccount.success")}</h6>
      <p>{t("setupaccount.success.message")}</p>
      <ConfirmButton
        text="Top up your account"
        className="w-auto font-normal normal-case"
        onClick={handleClick}
      />

      <ConfettiExplosion
        zIndex={11}
        duration={7000}
        particleCount={250}
        height={3000}
        width={3000}
      />
    </section>
  );
};
