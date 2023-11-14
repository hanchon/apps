"use client";
import { useTranslation } from "@evmosapps/i18n/client";
import { StepsContextProvider } from "@evmosapps/copilot";
import { Content } from "@evmosapps/copilot/src/copilot/Content";
import { CopilotModal } from "@evmosapps/copilot/src/copilot/CopilotModal";
import {
  setupSteps,
  topUpStep,
} from "@evmosapps/copilot/src/copilot/container/data";
import { stepsSetAccount } from "@evmosapps/copilot/src/copilot/steps/setUpAccount/utils";

import { useModal } from "helpers";

import { Modal } from "@evmosapps/ui-helpers";
export const useTopupModal = () => useModal("topup");

export const TopupModal = () => {
  const { isOpen, setIsOpen } = useTopupModal();
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body className="p-0 overflow-hidden max-w-3xl">
        <StepsContextProvider steps={topUpStep}>
          <Content />
        </StepsContextProvider>
      </Modal.Body>
    </Modal>
  );
};
