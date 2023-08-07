// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext, useEffect, useMemo, useState } from "react";
import { StepsContext } from "../container/StepsContext";
import { STEP_STATUS } from "../steps/setUpAccount/buttons/utils";
import { StepsContainerDapp } from "./StepsContainarDapp";
import { GetProviderFromLocalStorage } from "evmos-wallet";
import { useEvmosBalance } from "../steps/topUp/useEvmosBalance";

export const useCopilotDapp = () => {
  const { dappStepStatus, updateStepsStatusDapp, resetStepsDapp } =
    useContext(StepsContext);

  const { evmosBalance } = useEvmosBalance();
  const memoEvmosBalance = useMemo(() => {
    return evmosBalance;
  }, [evmosBalance]);

  useEffect(() => {
    if (
      dappStepStatus[0].status === STEP_STATUS.CURRENT &&
      GetProviderFromLocalStorage() !== null
    ) {
      updateStepsStatusDapp();
    }
    // this is giving an infinite loop if I add the memoEvmosBalance
    if (
      dappStepStatus[1].status === STEP_STATUS.CURRENT &&
      !memoEvmosBalance.isZero()
    ) {
      updateStepsStatusDapp();
    }
    if (
      (dappStepStatus[2].status === STEP_STATUS.CURRENT &&
        GetProviderFromLocalStorage() === null) ||
      (dappStepStatus[1].status === STEP_STATUS.CURRENT &&
        GetProviderFromLocalStorage() === null)
    ) {
      resetStepsDapp();
    }
  }, []);

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
