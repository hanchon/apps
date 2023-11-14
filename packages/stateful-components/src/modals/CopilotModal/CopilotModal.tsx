"use client";
import { useTranslation } from "@evmosapps/i18n/client";
import { StepsContextProvider } from "@evmosapps/copilot";
import { Content } from "@evmosapps/copilot/src/copilot/Content";
import { CopilotModal } from "@evmosapps/copilot/src/copilot/CopilotModal";
import { setupSteps } from "@evmosapps/copilot/src/copilot/container/data";
import { stepsSetAccount } from "@evmosapps/copilot/src/copilot/steps/setUpAccount/utils";
import { useCopilot } from "@evmosapps/copilot/src/copilot/useCopilot";
import { useModal } from "helpers";
import { EvmosCopilotIcon } from "icons";
import {
  IntroductionModal,
  ModalContainer,
  Modal,
} from "@evmosapps/ui-helpers";
export const useSetupCopilotModal = () => useModal("setup-copilot");

export const Copilot = () => {
  const { isOpen, setIsOpen } = useSetupCopilotModal();
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body className="p-0 overflow-hidden max-w-3xl">
        <StepsContextProvider steps={setupSteps}>
          <Content />
        </StepsContextProvider>
      </Modal.Body>
    </Modal>
  );
};
