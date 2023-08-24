// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { GroupStateI, CompleteStepI, HandleStepErrorsI } from "./types";
import { STEP_STATUS } from "constants-helper";
export const handleStepError = ({
  setStatus,
  setText,
  step,
  setTextError,
  index,
  text,
}: HandleStepErrorsI) => {
  setStatus(STEP_STATUS.CURRENT);
  setText(text);
  if (step.errorsText) {
    setTextError(step.errorsText.at(index) ?? "");
  }
};

export const completeStep = ({
  setStatus,
  setGroupState,
  setText,
  step,
}: CompleteStepI) => {
  setText(step.doneText);
  setStatus(STEP_STATUS.DONE);
  setGroupState((state) =>
    state.map((actionGroup) =>
      actionGroup.id === step.id
        ? {
            ...actionGroup,
            status: STEP_STATUS.DONE,
          }
        : actionGroup
    )
  );
};

// if the prevStep is done, set the status to current.
export const updateCurrentStatus = (
  groupState: GroupStateI[],
  currentIndex: number
) => {
  const updatedState = [...groupState];
  const prevStep = updatedState[currentIndex - 1];
  if (prevStep && prevStep.status === STEP_STATUS.DONE) {
    const currentStep = updatedState.at(currentIndex) as GroupStateI;
    const updatedStep = { ...currentStep, status: STEP_STATUS.CURRENT };
    const mapState = new Map(updatedState.entries());
    mapState.set(currentIndex, updatedStep);
    return Array.from(mapState.values());
  }
  return updatedState;
};

export const checkAllDoneStatus = (groupState: GroupStateI[]) => {
  return groupState.every(
    (obj) =>
      Object.prototype.hasOwnProperty.call(obj, "status") &&
      obj.status === STEP_STATUS.DONE
  );
};
