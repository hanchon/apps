"use client";
import { useTranslation } from "@evmosapps/i18n/client";
import { StepsContextProvider } from "copilot";
import { Content } from "copilot/src/copilot/Content";
import { CopilotModal } from "copilot/src/copilot/CopilotModal";
import { setupSteps, topUpStep } from "copilot/src/copilot/container/data";
import { stepsSetAccount } from "copilot/src/copilot/steps/setUpAccount/utils";

import { useModal } from "helpers";

import { ModalWithTransitions } from "ui-helpers";
export const useTopupModal = () => useModal("topup");

export const TopupModal = () => {
  const { isOpen, setIsOpen } = useTopupModal();
  return (
    <ModalWithTransitions show={isOpen} setShow={setIsOpen} propClose={true}>
      <StepsContextProvider steps={topUpStep}>
        <Content />
      </StepsContextProvider>
    </ModalWithTransitions>
  );
};
