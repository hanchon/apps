"use client";
import { ConnectToEvmos } from "evmos-wallet/src/copilot/ConnectToEvmos";
import { useModal } from "helpers";
import { ModalContainer, Modal } from "ui-helpers";
import { ConnectModalContent } from "./ConnectModalContent";

export const useConnectModal = () => useModal("connect");

export const ConnectModal = () => {
  const { isOpen, setIsOpen } = useConnectModal();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body>
        <ModalContainer
          introduction={<ConnectToEvmos />}
          content={<ConnectModalContent setIsOpen={setIsOpen} />}
        />
      </Modal.Body>
    </Modal>
  );
};
