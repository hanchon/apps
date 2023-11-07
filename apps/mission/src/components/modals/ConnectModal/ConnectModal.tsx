"use client";
import { ConnectToEvmos } from "evmos-wallet/src/copilot/ConnectToEvmos";
import { useModal } from "helpers";
import { ModalContainer, ModalWithTransitions } from "ui-helpers";
import { ConnectModalContent } from "./ConnectModalContent";

export const useConnectModal = () => useModal("connect");

export const ConnectModal = () => {
  const { isOpen, setIsOpen } = useConnectModal();

  return (
    <ModalWithTransitions show={isOpen} setShow={setIsOpen} propClose={true}>
      <ModalContainer
        introduction={<ConnectToEvmos />}
        content={<ConnectModalContent setShow={setIsOpen} />}
      />
    </ModalWithTransitions>
  );
};
