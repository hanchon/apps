import { useCallback, useEffect, useMemo, useState } from "react";
import { StepsContainerDapp } from "./StepsContainarDapp";
import { StoreType, useEvmosBalance } from "evmos-wallet";
import { useSelector } from "react-redux";
import { steps } from "../container/data";

export const useCopilotCard = () => {
  const [copilotSteps, setCopilotSteps] = useState(steps);
  const value = useSelector((state: StoreType) => state.wallet.value);
  const { evmosBalance } = useEvmosBalance();
  useEffect(() => {
    if (copilotSteps[0].status === "current" && value.active) {
      setCopilotSteps((prev) => {
        const updatedState = [...prev];
        updatedState[0].status = "done";
        updatedState[1].status = "current";
        return updatedState;
      });
    }

    if (copilotSteps[0].status === "done" && !value.active) {
      setCopilotSteps((prev) => {
        const updatedState = [...prev];
        updatedState[0].status = "current";
        updatedState[1].status = "not_processed";
        updatedState[2].status = "not_processed";
        return updatedState;
      });
    }

    if (copilotSteps[1].status === "current" && !evmosBalance.isZero()) {
      setCopilotSteps((prev) => {
        const updatedState = [...prev];
        updatedState[1].status = "done";
        updatedState[2].status = "current";
        return updatedState;
      });
    }
  }, [copilotSteps, value, evmosBalance]);

  const stepsToDraw = useMemo(() => {
    if (copilotSteps.length === 1) {
      return;
    }
    return copilotSteps.map((step) => {
      return <StepsContainerDapp key={step.title} step={step} />;
    });
  }, [copilotSteps]);

  const drawButton = useCallback(() => {
    return copilotSteps.map((item) => {
      return <div key={item.index}>{item.buttonDapp(item.status)}</div>;
    });
  }, [copilotSteps]);

  return { stepsToDraw, drawButton };
};
