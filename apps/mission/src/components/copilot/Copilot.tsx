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
