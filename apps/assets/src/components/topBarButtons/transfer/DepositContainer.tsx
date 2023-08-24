// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { stepsSetAccountKeplr } from "./utils";
import { useEffect, useMemo, useState } from "react";
import { ConnectKeplr } from "./ConnectKeplr";
import { Deposit } from "./Deposit";
import { checkAllDoneStatus } from "ui-helpers/src/progress/helpers";

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
