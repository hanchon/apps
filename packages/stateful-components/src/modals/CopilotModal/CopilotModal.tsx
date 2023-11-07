"use client";
import { useTranslation } from "@evmosapps/i18n/client";
import { StepsContextProvider } from "copilot";
import { Content } from "copilot/src/copilot/Content";
import { CopilotModal } from "copilot/src/copilot/CopilotModal";
import { setupSteps } from "copilot/src/copilot/container/data";
import { stepsSetAccount } from "copilot/src/copilot/steps/setUpAccount/utils";
import { useCopilot } from "copilot/src/copilot/useCopilot";
import { useModal } from "helpers";
import { EvmosCopilotIcon } from "icons";
import {
  IntroductionModal,
  ModalContainer,
  ModalWithTransitions,
} from "ui-helpers";
export const useSetupCopilotModal = () => useModal("setup-copilot");

export const Copilot = () => {
  const { isOpen, setIsOpen } = useSetupCopilotModal();
  return (
    <ModalWithTransitions show={isOpen} setShow={setIsOpen} propClose={true}>
      <StepsContextProvider steps={setupSteps}>
        <Content />
      </StepsContextProvider>
    </ModalWithTransitions>
  );
};
