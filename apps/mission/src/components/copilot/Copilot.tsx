// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext } from "react";
import { CopilotModal } from "../copilot/CopilotModal";
import { StepsContext } from "./container/StepsContext";
export const Copilot = () => {
  const { setShowModal } = useContext(StepsContext);
  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="w-fit bg-red"
      >
        Copilot
      </button>

      <CopilotModal />
    </>
  );
};
