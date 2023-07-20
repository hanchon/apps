// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Badge } from "ui-helpers";
import { useFireworks } from "./useFireworks";
import {
  handleInteractWithdApp,
  handleLearnMore,
  handleStakeWithEvmos,
  renderFireworksPortal,
} from "./helpers";
import { Button } from "./button/Button";
import { TitleButton } from "./button/TitleButton";
import { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { StepsContext } from "../../container/StepsContext";

export const NextSteps = () => {
  const { fireworksRef, portalContainer } = useFireworks();
  const { setShowModal, resetSteps } = useContext(StepsContext);
  const { t } = useTranslation();

  const firstUpdate = useRef(true);
  useEffect(() => {
    setInterval(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
      }
    }, 5000);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-center">
      {firstUpdate.current &&
        renderFireworksPortal(fireworksRef, portalContainer)}
      <p className="mb-4 flex h-56 w-56 items-center justify-center rounded-full border border-[#F0FDF4] bg-[#F0FDF4] text-9xl">
        <span role="img" aria-label="Celebration icon">
          👏
        </span>
      </p>
      <h1 className="font-bold">{t("nextsteps.title")}</h1>
      <p className="text-sm">{t("nextsteps.description")}</p>
      <div className="grid w-full grid-cols-1 space-y-3 pt-5 pb-3 md:grid-cols-2 md:space-y-0 md:space-x-4">
        <Button
          handleClick={() => {
            handleInteractWithdApp(t("ecosystemUrl"), setShowModal);
            resetSteps();
          }}
        >
          <TitleButton text={t("nextsteps.interactWithdApp.title")} />
          <Badge text={t("nextsteps.interactWithdApp.badge")} />
        </Button>

        <Button
          handleClick={() => {
            handleStakeWithEvmos(t("stakingUrl"), setShowModal);
            resetSteps();
          }}
        >
          <TitleButton text={t("nextsteps.stakeEvmos.title")} />

          <Badge
            text={t("nextsteps.stakeEvmos.badge")}
            style="ring-[#F4E5BA] bg-[#FEFCE8] text-[#854D0E]"
          />
        </Button>
      </div>
      <button
        className="w-full cursor-pointer rounded-lg border border-[#D1D5DB] py-3 shadow transition-all duration-300 hover:shadow-md"
        onClick={() => {
          handleLearnMore(t("academyFAQUrl"), setShowModal);
          resetSteps();
        }}
      >
        <TitleButton text={t("nextsteps.learnMore.title")} />
      </button>
    </div>
  );
};
