import {
  ChainPrefixSchema,
  HexSchema,
} from "evmos-wallet/src/registry-actions/utils";
import { z } from "zod";

import { ModalWithTransitions } from "ui-helpers";

import { ReceiptModalContent } from "./ReceiptModalContent";
import { ModalProps, useModal } from "helpers";

const ReceiptModalSchema = z.object({
  hash: HexSchema,
  chainPrefix: ChainPrefixSchema,
});

export type ReceiptModalProps = ModalProps<typeof ReceiptModalSchema>;

export const useReceiptModal = () => useModal("receipt", ReceiptModalSchema);

export const ReceiptModal = () => {
  const { isOpen, setIsOpen, modalProps } = useReceiptModal();

  return (
    <ModalWithTransitions
      show={isOpen}
      setShow={setIsOpen}
      variant="modal-black"
    >
      {modalProps && <ReceiptModalContent {...modalProps} />}
    </ModalWithTransitions>
  );
};
