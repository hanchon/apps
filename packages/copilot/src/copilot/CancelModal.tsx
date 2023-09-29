// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext } from "react";
import { CloseModal, ModalWithTransitions } from "ui-helpers";
import { StepsContext } from "./container/StepsContext";
import { useTracker, EXIT_OUT_COPILOT } from "tracker";
import { STEP_STATUS } from "constants-helper";
import { TranslationContextProvider } from "schummar-translate/react";
import { t } from "../locales/translate";
export const CancelModal = () => {
  const {
    setShowModal,
    setShowCloseModal,
    showCloseModal,
    resetSteps,
    stepsStatus,
  } = useContext(StepsContext);

  const { handlePreClickAction } = useTracker(EXIT_OUT_COPILOT);
  const handleAccept = () => {
    handlePreClickAction({
      step: getCurrentStep()?.title,
      exitConfirmation: "stay",
    });
    setShowCloseModal(false);
  };

  const getCurrentStep = () => {
    // TODO: create a function to get the currentElement
    const currentElement = stepsStatus.find(
      (element) => element.status === STEP_STATUS.CURRENT,
    );
    return currentElement;
  };

  const handleReject = () => {
    handlePreClickAction({
      step: getCurrentStep()?.title,
      exitConfirmation: "exit",
    });
    resetSteps();
    setShowCloseModal(false);
    setShowModal(false);
  };

  return (
    <TranslationContextProvider locale="en">
      <ModalWithTransitions show={showCloseModal} setShow={setShowCloseModal}>
        <CloseModal
          handleReject={handleReject}
          handleAccept={handleAccept}
          description={t("exitcopilot.description") as string}
          title={t("exitcopilot.title") as string}
        />
      </ModalWithTransitions>
    </TranslationContextProvider>
  );
};
