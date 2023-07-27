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

import { StepsContext } from "../../container/StepsContext";
import {
  CLICK_ON_INTERACT_WITH_DAPP_COPILOT,
  CLICK_ON_LEARN_MORE_COPILOT,
  CLICK_ON_STAKE_YOUR_EVMOS_COPILOT,
  useTracker,
} from "tracker";
import { TranslationContextProvider } from "schummar-translate/react";
import { t } from "../../../locales/translate";

export const NextSteps = () => {
  const { fireworksRef, portalContainer } = useFireworks();
  const { setShowModal, resetSteps } = useContext(StepsContext);

  const firstUpdate = useRef(true);
  useEffect(() => {
    setInterval(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
      }
    }, 5000);
  }, []);

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
    <TranslationContextProvider locale="en">
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
              handleInteractWithdApp(
                t("ecosystemUrl")?.toString() as string,
                setShowModal
              );
              trackInteractWithdAppClick();
              resetSteps();
            }}
          >
            <TitleButton
              text={t("nextsteps.interactWithdApp.title")?.toString() as string}
            />
            <Badge
              text={t("nextsteps.interactWithdApp.badge")?.toString() as string}
            />
          </Button>

          <Button
            handleClick={() => {
              handleStakeWithEvmos(
                t("stakingUrl")?.toString() as string,
                setShowModal
              );
              trackStakeEvmosClick();
              resetSteps();
            }}
          >
            <TitleButton
              text={t("nextsteps.stakeEvmos.title")?.toString() as string}
            />

            <Badge
              text={t("nextsteps.stakeEvmos.badge")?.toString() as string}
              style="ring-[#F4E5BA] bg-[#FEFCE8] text-[#854D0E]"
            />
          </Button>
        </div>
        <button
          className="w-full cursor-pointer rounded-lg border border-[#D1D5DB] py-3 shadow transition-all duration-300 hover:shadow-md"
          onClick={() => {
            handleLearnMore(
              t("academyFAQUrl")?.toString() as string,
              setShowModal
            );
            trackLearnMoreClick();
            resetSteps();
          }}
        >
          <TitleButton
            text={t("nextsteps.learnMore.title")?.toString() as string}
          />
        </button>
      </div>
    </TranslationContextProvider>
  );
};
