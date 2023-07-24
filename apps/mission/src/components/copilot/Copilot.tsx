// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext } from "react";
import { CopilotModal } from "../copilot/CopilotModal";
import { StepsContext } from "./container/StepsContext";
import { useTracker, CLICK_EVMOS_COPILOT_START_FLOW } from "tracker";
export const Copilot = () => {
  const { setShowModal } = useContext(StepsContext);
  const { handlePreClickAction } = useTracker(CLICK_EVMOS_COPILOT_START_FLOW);
  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
          handlePreClickAction();
        }}
        className="w-fit bg-red"
      >
        Copilot
      </button>

      <CopilotModal />
    </>
  );
};
