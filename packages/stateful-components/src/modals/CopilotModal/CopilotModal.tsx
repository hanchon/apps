"use client";
import { StepsContextProvider } from "@evmosapps/copilot";
import { Content } from "@evmosapps/copilot/src/copilot/Content";
import { setupSteps } from "@evmosapps/copilot/src/copilot/container/data";
import { modalLink, useModal } from "helpers";
import { Modal } from "@evmosapps/ui-helpers";
export const useSetupCopilotModal = () => useModal("setup-copilot");
export const CopilotModalButton = modalLink("setup-copilot");

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
