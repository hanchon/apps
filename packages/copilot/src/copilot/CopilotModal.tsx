// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext, useEffect } from "react";
import { ModalContainer, ModalWithTransitions } from "ui-helpers";
import { Introduction } from "./Introduction";
import { useCopilot } from "./useCopilot";
import { StepsContext } from "./container/StepsContext";
import { CancelModal } from "./CancelModal";
import { checkReloadFlagToReloadModal } from "./utils";

export const CopilotModal = () => {
  const { componentToDraw, stepsToDraw } = useCopilot();
  const { showModal, setShowModal, setShowCloseModal } =
    useContext(StepsContext);

  useEffect(() => {
    const reload = checkReloadFlagToReloadModal();
    if (reload) {
      setShowModal(true);
    }
  }, [setShowModal]);

  const contentModal = (
    <>
      <CancelModal />
      <ModalContainer
        introduction={
          <>
            <Introduction />
            <ol className="space-y-3 pt-4 md:pt-0">{stepsToDraw}</ol>{" "}
          </>
        }
        content={componentToDraw?.component}
      />
    </>
  );

  return (
    <ModalWithTransitions
      show={showModal}
      setShow={setShowModal}
      content={contentModal}
      propClose={true}
      handleCloseAction={setShowCloseModal}
    />
  );
};
