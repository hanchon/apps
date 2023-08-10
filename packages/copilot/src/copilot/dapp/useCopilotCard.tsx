import { useCallback, useEffect, useMemo, useState } from "react";
import { StepsContainerDapp } from "./StepsContainarDapp";
import { StoreType, getSequence, useEvmosBalance } from "evmos-wallet";
import { useSelector } from "react-redux";
import { steps } from "../container/data";
import {
  USER_CONNECTED_AND_HAS_NO_TOKENS,
  USER_CONNECTED_AND_HAS_TOKENS,
  USER_NOT_CONNECTED,
  useTracker,
} from "tracker";

export const useCopilotCard = () => {
  const [copilotSteps, setCopilotSteps] = useState(steps);
  const [sequence, setSequence] = useState(false);
  const value = useSelector((state: StoreType) => state.wallet.value);
  const { evmosBalance } = useEvmosBalance();
  const { handlePreClickAction } = useTracker(USER_NOT_CONNECTED);
  const { handlePreClickAction: connectedWithTokensEvent } = useTracker(
    USER_CONNECTED_AND_HAS_TOKENS
  );
  const { handlePreClickAction: connectedWithoutTokensEvent } = useTracker(
    USER_CONNECTED_AND_HAS_NO_TOKENS
  );

  useEffect(() => {
    if (copilotSteps[0].status === "current" && value.active) {
      setCopilotSteps((prev) => {
        const updatedState = [...prev];
        updatedState[0].status = "done";
        updatedState[1].status = "current";
        return updatedState;
      });
    }

    if (copilotSteps[0].status === "current" && !value.active) {
      // User is not connected to an account
      handlePreClickAction();
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

    if (copilotSteps[1].status === "current" && evmosBalance.isZero()) {
      connectedWithoutTokensEvent();
    }
    if (copilotSteps[1].status === "current" && !evmosBalance.isZero()) {
      // User is connected to an account and has Evmos
      connectedWithTokensEvent();
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

  useEffect(() => {
    async function getSequenceNumber() {
      if (value.evmosAddressCosmosFormat === "") {
        setSequence(false);
      }
      const sequenceNumber = await getSequence(
        "https://rest.bd.evmos.org:1317",
        value.evmosAddressCosmosFormat
      );
      if (sequenceNumber === "0") {
        setSequence(false);
      }
      setSequence(true);
    }
    // Execute the async function
    // Can not await inside a useEffect
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getSequenceNumber();
  }, [sequence]);

  return { stepsToDraw, drawButton, sequence };
};
