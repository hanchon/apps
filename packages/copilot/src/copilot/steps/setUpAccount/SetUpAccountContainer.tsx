"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect, useMemo, useState } from "react";
import { stepsSetAccount } from "./utils";
import { SuccessSetUp } from "./SuccessSetUp";
import { checkAllDoneStatus } from "ui-helpers/src/progress/helpers";
import { SetUpAccount } from "./SetUpAccount";

export const SetUpAccountContainer = () => {
  const [groupState, setGroupState] = useState(
    stepsSetAccount.map((step, index) => ({
      id: step.id,
      index,
      status: step.status,
    }))
  );

  const isSetUpDone = useMemo(() => {
    return checkAllDoneStatus(groupState);
  }, [groupState]);

  const [showComponent, setIsOpenComponent] = useState(false);
  useEffect(() => {
    setInterval(() => {
      if (isSetUpDone) {
        setIsOpenComponent(true);
      }
    }, 800);
  }, [isSetUpDone]);

  return isSetUpDone && showComponent ? (
    <SuccessSetUp />
  ) : (
    <SetUpAccount
      stepsSetAccount={stepsSetAccount}
      groupState={groupState}
      setGroupState={setGroupState}
    />
  );
};
