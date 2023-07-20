// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import ConfettiExplosion from "react-confetti-explosion";
import { useContext } from "react";
import { StepsContext } from "../../container/StepsContext";
import { useTranslation } from "react-i18next";
export const SuccessSetUp = () => {
  const { updateStepsStatus } = useContext(StepsContext);

  const handleClick = () => {
    updateStepsStatus();
  };

  const { t } = useTranslation();
  return (
    <section className=" h-full w-full space-y-1 overflow-hidden text-center">
      <div className="flex items-center justify-center ">
        <p className="mb-4 flex h-56 w-56 items-center justify-center rounded-full border border-[#F0FDF4] bg-[#F0FDF4] text-9xl">
          <span role="img" aria-label="Celebration icon">
            🎉
          </span>
        </p>
      </div>
      <h6 className="font-bold">{t("setupaccount.success")}</h6>
      <p className="pb-5 text-sm">{t("setupaccount.success.message")}</p>
      {/* TODO: create a reusable button for copilot */}
      <button
        onClick={handleClick}
        className="ml-4 w-auto space-x-2 rounded-lg bg-red
            px-8 py-2 font-normal  normal-case text-pearl shadow transition-all duration-300 hover:bg-red1 hover:shadow-md "
      >
        {t("setupaccount.button.text")}
      </button>

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
