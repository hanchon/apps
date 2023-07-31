// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext } from "react";
import { ModalWithTransitions } from "ui-helpers";
import { AlertIcon } from "icons";
import { StepsContext } from "./container/StepsContext";
import { useTracker, EXIT_OUT_COPILOT } from "tracker";
import { STEP_STATUS } from "./steps/setUpAccount/buttons/utils";
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
      (element) => element.status === STEP_STATUS.CURRENT
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
  const contentModal = (
    <div className="flex max-w-[550px] px-4 pr-2 pb-4 pt-5 sm:p-6">
      <div className="items-start justify-start">
        <span
          role="img"
          aria-label="alert icon"
          className="flex items-center justify-center rounded-full border border-pink bg-pink p-2"
        >
          <AlertIcon
            width={24}
            height={24}
            color="#dc2626"
            className="relative -top-[1px]"
          />
        </span>
      </div>
      <div className="mx-5 mt-0 space-y-3">
        <h3 className="text-gray-900 text-base font-semibold leading-6">
          {t("exitcopilot.title")}
        </h3>
        <p className="">{t("exitcopilot.description")}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleAccept}
            className="color-gray300 rounded-lg border border-gray300 px-8 py-2 font-normal shadow transition-all duration-300 hover:shadow-md focus-visible:outline-none"
          >
            {t("exitcopilot.accept")}
          </button>

          {/* TODO: create a reusable button for copilot */}
          <button
            onClick={handleReject}
            className="ml-4 w-auto space-x-2 rounded-lg bg-red
            px-8 py-2 font-normal  normal-case text-pearl shadow transition-all duration-300 hover:bg-red1 hover:shadow-md "
          >
            {t("exitcopilot.reject")}
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <TranslationContextProvider locale="en">
      <ModalWithTransitions
        show={showCloseModal}
        setShow={setShowCloseModal}
        content={contentModal}
      />
    </TranslationContextProvider>
  );
};
