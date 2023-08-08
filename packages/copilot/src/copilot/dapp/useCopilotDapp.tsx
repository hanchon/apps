// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext, useMemo } from "react";
import { StepsContext } from "../container/StepsContext";
import { STEP_STATUS } from "../steps/setUpAccount/buttons/utils";
import { StepsContainerDapp } from "./StepsContainarDapp";

export const useCopilotDapp = () => {
  const { dappStepStatus } = useContext(StepsContext);

  const componentToDraw = useMemo(() => {
    return dappStepStatus.find(
      (element) => element.status === STEP_STATUS.CURRENT
    );
  }, [dappStepStatus]);

  const stepsToDraw = useMemo(() => {
    if (dappStepStatus.length === 1) {
      return;
    }
    return dappStepStatus.map((step) => {
      return <StepsContainerDapp key={step.title} step={step} />;
    });
  }, [dappStepStatus]);
  return { componentToDraw, stepsToDraw };
};
