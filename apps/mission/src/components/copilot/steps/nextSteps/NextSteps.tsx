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
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StepsContext } from "../../container/StepsContext";
import {
  CLICK_ON_INTERACT_WITH_DAPP_COPILOT,
  CLICK_ON_LEARN_MORE_COPILOT,
  CLICK_ON_STAKE_YOUR_EVMOS_COPILOT,
  useTracker,
} from "tracker";

export const NextSteps = () => {
  const { fireworksRef, portalContainer } = useFireworks();
  const { setShowModal, resetSteps } = useContext(StepsContext);
  const { t } = useTranslation();

  const { handlePreClickAction: trackInteractWithdAppClick } = useTracker(
    CLICK_ON_INTERACT_WITH_DAPP_COPILOT
  );
  const { handlePreClickAction: trackStakeEvmosClick } = useTracker(
    CLICK_ON_STAKE_YOUR_EVMOS_COPILOT
  );
  const { handlePreClickAction: trackLearnMoreClick } = useTracker(
    CLICK_ON_LEARN_MORE_COPILOT
  );
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      {renderFireworksPortal(fireworksRef, portalContainer)}
      <p className="mb-4 flex h-48 w-48 items-center justify-center rounded-full border border-[#FAF8F8] bg-[#FAF8F8] text-9xl">
        <span role="img" aria-label="Celebration icon">
          🎉
        </span>
      </p>
      <h1 className="font-bold">{t("nextsteps.title")}</h1>
      <p className="text-xs">{t("nextsteps.description")}</p>
      <div className="flex w-full items-center justify-between">
        <Button
          handleClick={() => {
            handleInteractWithdApp(t("ecosystemUrl"), setShowModal);
            trackInteractWithdAppClick();
            resetSteps();
          }}
        >
          <TitleButton text={t("nextsteps.interactWithdApp.title")} />
          <Badge text={t("nextsteps.interactWithdApp.badge")} />
        </Button>

        <Button
          handleClick={() => {
            handleStakeWithEvmos(t("stakingUrl"), setShowModal);
            trackStakeEvmosClick();
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
        className="w-full cursor-pointer rounded-lg border border-[#D1D5DB] py-3"
        onClick={() => {
          handleLearnMore(t("academyFAQUrl"), setShowModal);
          trackLearnMoreClick();
          resetSteps();
        }}
      >
        <TitleButton text={t("nextsteps.learnMore.title")} />
      </button>
    </div>
  );
};
