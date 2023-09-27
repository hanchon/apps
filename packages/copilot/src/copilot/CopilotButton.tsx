import { EvmosCopilotIcon } from "icons";
import { Divider, Badge } from "ui-helpers";
import { ButtonWallet } from "evmos-wallet";
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
          className="text-left flex "
          onClick={() => {
            setShowModal(true);
            handlePreClickAction();
            if (beforeStartHook) {
              beforeStartHook(false);
            }
          }}
        >
          <EvmosCopilotIcon />
          <div className="flex flex-col text-sm grow">
            <p className="">Evmos Copilot</p>
            <p className="font-normal">Recommended for first time users</p>
          </div>

          <Badge variant="success">New</Badge>
        </ButtonWallet>
      </div>
      <Divider>
        <>or</>
      </Divider>
    </>
  );
};
