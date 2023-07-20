// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext } from "react";
import { ModalWithTransitions } from "ui-helpers";
import { AlertIcon } from "icons";
import { useTranslation } from "react-i18next";
import { StepsContext } from "./container/StepsContext";

export const CancelModal = () => {
  const { t } = useTranslation();
  const { setShowModal, setShowCloseModal, showCloseModal, resetSteps } =
    useContext(StepsContext);

  const handleAccept = () => {
    setShowCloseModal(false);
  };

  const handleReject = () => {
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
          className="flex items-center justify-center rounded-full border border-[#fee2e2] bg-[#fee2e2] p-2"
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
            className="color-[#D1D5DB] rounded-lg border border-[#D1D5DB] px-8 py-2 font-normal shadow transition-all duration-300 hover:shadow-md focus-visible:outline-none"
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
    <>
      <ModalWithTransitions
        show={showCloseModal}
        setShow={setShowCloseModal}
        content={contentModal}
      />
    </>
  );
};
