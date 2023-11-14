"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext, useEffect } from "react";
import { Modal } from "ui-helpers";
import { StepsContext } from "./container/StepsContext";
import { getCopilotModalState } from "./utils";

import { Content } from "./Content";
export const CopilotModal = () => {
  const { showModal, setIsOpenModal } = useContext(StepsContext);

  useEffect(() => {
    const reload = getCopilotModalState().reloadMetaMask;
    if (reload) {
      setIsOpenModal(true);
    }
  }, [setIsOpenModal]);

  return (
    <Modal isOpen={showModal} setIsOpen={setIsOpenModal}>
      <Content />
    </Modal>
  );
};
