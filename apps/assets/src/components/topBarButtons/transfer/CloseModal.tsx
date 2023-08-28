// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useTranslation } from "next-i18next";
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

  const { t } = useTranslation();

  return (
    <ModalWithTransitions show={showCloseModal} setShow={setShowCloseModal}>
      <CloseModal
        handleReject={handleReject}
        handleAccept={handleAccept}
        description={t("transfer.modal.close.text")}
        title={t("transfer.modal.close.title")}
      />
    </ModalWithTransitions>
  );
};
