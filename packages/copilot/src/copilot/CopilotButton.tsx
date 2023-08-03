import { EvmosCopilotIcon } from "icons";
import { DividerWithLabel, Badge } from "ui-helpers";
import { ButtonWallet } from "evmos-wallet/src/wallet/ButtonWallet";
import { StepsContext } from "./container/StepsContext";
import { useTracker, CLICK_EVMOS_COPILOT_START_FLOW } from "tracker";
import { useContext } from "react";
import { Dispatch, SetStateAction } from "react";

export const CopilotButton = ({
  beforeStartHook,
}: {
  beforeStartHook?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { setShowModal } = useContext(StepsContext);
  const { handlePreClickAction } = useTracker(CLICK_EVMOS_COPILOT_START_FLOW);

  return (
    <>
      <div className="md:mt-5">
        <ButtonWallet
          onClick={() => {
            setShowModal(true);
            handlePreClickAction();
            if (beforeStartHook) {
              beforeStartHook(false);
            }
          }}
        >
          <div className="flex items-center justify-between  ">
            <div className="flex items-center space-x-3 text-left">
              <EvmosCopilotIcon />
              <div className="flex flex-col text-sm">
                <p className="font-bold">Evmos Copilot</p>
                <p className="normal-case">Recommended for first time users</p>
              </div>
            </div>
            <Badge text="New" />
          </div>
        </ButtonWallet>
      </div>
      <DividerWithLabel label="or" />
    </>
  );
};
