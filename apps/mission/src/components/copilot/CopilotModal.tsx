// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext, useEffect } from "react";
import { ModalWithTransitions } from "ui-helpers";
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
      <div className="grid grid-rows-1 divide-y divide-[#DBD3D1] text-[#413836] md:grid-cols-3 md:grid-rows-none md:divide-y-0 md:divide-x">
        <div className="flex h-full flex-col justify-between px-4 pb-4 pt-5 sm:py-10 sm:px-6">
          <Introduction />
          <ol className="mt-4 space-y-3 md:mt-0">{stepsToDraw}</ol>
        </div>
        <div className="space-y-3 bg-white px-4 pb-4 pt-5 sm:p-10 md:col-span-2 md:px-8">
          {componentToDraw?.component}
        </div>
      </div>
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
