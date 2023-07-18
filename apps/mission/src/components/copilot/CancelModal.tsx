// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext } from "react";
import { ModalWithTransitions, ConfirmButton } from "ui-helpers";
import { AlertIcon } from "icons";
import { useTranslation } from "react-i18next";
import { StepsContext } from "./container/StepsContext";
import { useTracker, EXIT_OUT_COPILOT } from "tracker";
import { STEP_STATUS } from "./steps/setUpAccount/buttons/utils";
export const CancelModal = () => {
  const { t } = useTranslation();
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
      exitConfirmation: "cancel",
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
      exitConfirmation: "close copilot",
    });
    resetSteps();
    setShowCloseModal(false);
    setShowModal(false);
  };
  const contentModal = (
    <div className="flex max-w-[550px] px-4 pr-2 pb-4 pt-5 sm:p-6">
      <div className="items-start justify-start">
        <AlertIcon />
      </div>
      <div className="mx-5 mt-0 space-y-3">
        <h3 className="text-gray-900 text-base font-semibold leading-6">
          {t("exitcopilot.title")}
        </h3>
        <p className="">{t("exitcopilot.description")}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleAccept}
            className="color-[#D1D5DB] rounded border border-[#D1D5DB] px-8 py-2 font-[GreyCliff] text-[16px] font-normal focus-visible:outline-none"
          >
            {t("exitcopilot.accept")}
          </button>
          <ConfirmButton
            text={t("exitcopilot.reject")}
            onClick={handleReject}
            className="w-auto font-normal normal-case"
          />
        </div>
      </div>
    </div>
  );
  return (
    <>
      <ModalWithTransitions
        show={showCloseModal}
        setShow={setShowCloseModal}
        content={contentModal}
      />
    </>
  );
};
