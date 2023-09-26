// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext, useEffect } from "react";
import { ModalWithTransitions } from "ui-helpers";
import { StepsContext } from "./container/StepsContext";
import { getCopilotModalState } from "./utils";

import { Content } from "./Content";
export const CopilotModal = () => {
  const { showModal, setShowModal, setShowCloseModal } =
    useContext(StepsContext);

  useEffect(() => {
    const reload = getCopilotModalState().reloadMetaMask;
    if (reload) {
      setShowModal(true);
    }
  }, [setShowModal]);

  return (
    <ModalWithTransitions
      show={showModal}
      setShow={setShowModal}
      propClose={true}
      handleCloseAction={setShowCloseModal}
    >
      <Content />
    </ModalWithTransitions>
  );
};
