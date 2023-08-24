import { stepsSetAccountKeplr } from "./utils";
import { useEffect, useMemo, useState } from "react";
import { GroupStateI } from "ui-helpers/src/progress/types";
import { STEP_STATUS } from "constants-helper";
import { ConnectKeplr } from "./ConnectKeplr";
import { Deposit } from "./Deposit";

// TODO: move to a common utils file
export const checkAllDoneStatus = (groupState: GroupStateI[]) => {
  return groupState.every(
    (obj) =>
      Object.prototype.hasOwnProperty.call(obj, "status") &&
      obj.status === STEP_STATUS.DONE
  );
};

export const DepositContainer = () => {
  const [groupState, setGroupState] = useState(
    stepsSetAccountKeplr.map((step, index) => ({
      id: step.id,
      index,
      status: step.status,
    }))
  );

  const isSetUpDone = useMemo(() => {
    return checkAllDoneStatus(groupState);
  }, [groupState]);

  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    setInterval(() => {
      if (isSetUpDone) {
        setShowComponent(true);
      }
    }, 800);
  }, [isSetUpDone]);

  return isSetUpDone && showComponent ? (
    // TODO: add the content for deposit component
    <Deposit />
  ) : (
    <ConnectKeplr groupState={groupState} setGroupState={setGroupState} />
  );
};
