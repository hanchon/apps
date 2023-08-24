// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, SetStateAction } from "react";
import { CloseModal, ModalWithTransitions } from "ui-helpers";

export const CancelModalTransfer = ({
  showCloseModal,
  setShowCloseModal,
  setShowModal,
}: {
  showCloseModal: boolean;
  setShowCloseModal: Dispatch<SetStateAction<boolean>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleAccept = () => {
    setShowCloseModal(false);
  };

  const handleReject = () => {
    setShowCloseModal(false);
    setShowModal(false);
  };

  return (
    <ModalWithTransitions
      show={showCloseModal}
      setShow={setShowCloseModal}
      content={
        <CloseModal
          handleReject={handleReject}
          handleAccept={handleAccept}
          description="You started a transfer process. Do you really want to exit from the process?"
          title="Cancel Transfer"
        />
      }
    />
  );
};
