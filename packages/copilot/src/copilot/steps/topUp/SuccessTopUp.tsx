// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext, useEffect, useRef, useState } from "react";
import { StepsContext } from "../../container/StepsContext";

import {
  CLICK_ON_CONTINUE_TO_THE_DASHBOARD,
  CLICK_ON_NEXT_STEPS_COPILOT,
  useTracker,
} from "tracker";
import { TranslationContextProvider } from "schummar-translate/react";
import { t } from "../../../locales/translate";
import { PrimaryButton } from "../../PrimaryButton";
import { IconContainer } from "ui-helpers";
import { ICONS_TYPES } from "constants-helper";
import { useTokenBalance } from "evmos-wallet";
import { useAccount } from "wagmi";
import { useWatch } from "helpers";

export const SuccessTopUp = () => {
  const { updateStepsStatus, hasSingleTopUpStep, setShowModal } =
    useContext(StepsContext);
  // when evmosBalance is different that 0, show the component
  const { address } = useAccount();
  const { balance, refetch } = useTokenBalance(address, "evmos:EVMOS");
  const [showMessage, setShowMessage] = useState(false);
  const initialBalance = useRef(balance);

  useWatch(() => {
    if (!balance) return;
    if (!initialBalance.current && balance) {
      initialBalance.current = balance;
      return;
    }
    if (!initialBalance.current) return;
    if (initialBalance.current.value < balance.value) {
      setShowMessage(true);
    }
  }, [balance?.value]);

  useEffect(() => {
    if (showMessage) return;
    const interval = setInterval(() => {
      void refetch();
    }, 3000);
    return () => clearInterval(interval);
  }, [refetch, showMessage]);

  const { handlePreClickAction } = useTracker(CLICK_ON_NEXT_STEPS_COPILOT);

  const { handlePreClickAction: clickContinue } = useTracker(
    CLICK_ON_CONTINUE_TO_THE_DASHBOARD
  );
  const handleOnClick = () => {
    updateStepsStatus();
    handlePreClickAction();
  };

  const handleOnClickTopUp = () => {
    clickContinue();
    setShowModal(false);
  };

  const drawButton = () => {
    if (hasSingleTopUpStep) {
      return (
        <PrimaryButton onClick={handleOnClickTopUp} className="ml-0 mt-3">
          {t("topup.onboard.success.step.topup.button.text") as string}
        </PrimaryButton>
      );
    }
    return (
      <PrimaryButton onClick={handleOnClick} className="ml-0 mt-3">
        {t("topup.onboard.success.button.text") as string}
      </PrimaryButton>
    );
  };

  return !showMessage ? (
    <></>
  ) : (
    <TranslationContextProvider locale="en">
      <div className="bg-lightYellow2 space-y-4 rounded-lg p-4">
        <div className=" flex items-start space-x-3">
          <IconContainer type={ICONS_TYPES.CONFETTI} />
          <div className="text-[#196235]">
            <h3 className="font-bold ">{t("topup.onboard.success.title")}</h3>
            <p className="text-sm">{t("topup.onboard.success.description")}</p>
            {drawButton()}
          </div>
        </div>
      </div>
    </TranslationContextProvider>
  );
};
