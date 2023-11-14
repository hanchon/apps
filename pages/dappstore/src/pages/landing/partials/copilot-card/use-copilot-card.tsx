import { StepsContext } from "@evmosapps/copilot";
import { setupSteps } from "@evmosapps/copilot/src/copilot/container/data";
import { StepsContainerDapp } from "@evmosapps/copilot/src/copilot/dapp/StepsContainarDapp";
import {
  StoreType,
  useEvmosBalance,
  getSequence,
} from "@evmosapps/evmos-wallet";
import { useSelector } from "react-redux";
import { useState, useContext, useMemo, useEffect } from "react";
import {
  useTracker,
  USER_NOT_CONNECTED,
  USER_CONNECTED_AND_HAS_TOKENS,
  USER_CONNECTED_AND_HAS_NO_TOKENS,
} from "tracker";

export const useCopilotCard = () => {
  const [copilotSteps, setCopilotSteps] = useState(setupSteps);
  const [sequence, setSequence] = useState(false);
  const value = useSelector((state: StoreType) => state.wallet.value);
  const { evmosBalance } = useEvmosBalance();
  const { resetSteps } = useContext(StepsContext);

  const tempEvmosBalance = useMemo(() => {
    return evmosBalance.isZero();
  }, [evmosBalance]);

  const tempValue = useMemo(() => {
    return value;
  }, [value]);

  const { handlePreClickAction: notConnected } = useTracker(USER_NOT_CONNECTED);

  const { handlePreClickAction: connectedWithTokensEvent } = useTracker(
    USER_CONNECTED_AND_HAS_TOKENS
  );
  const { handlePreClickAction: connectedWithoutTokensEvent } = useTracker(
    USER_CONNECTED_AND_HAS_NO_TOKENS
  );

  // Track if user is not connected to an account
  useEffect(() => {
    if (copilotSteps[0].status === "current" && !tempValue.active) {
      //
      notConnected();
    }
    // TODO: I'd rather not disable this role,
    // as not having exhaustive deps is often the source of hard to track bugs
    // but the useTracker hook is returning
    // a new function at every render
    // which itself depends on the parameters passed to it
    // ideally we should address that issue there first
    // and then remove the disable here
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copilotSteps, tempValue]);

  // Update status of the steps
  useEffect(() => {
    if (copilotSteps[0].status === "current" && tempValue.active) {
      setCopilotSteps((prev) => {
        const updatedState = [...prev];
        updatedState[0].status = "done";
        updatedState[1].status = "current";
        return updatedState;
      });
    }
  }, [copilotSteps, tempValue]);

  // Reset steps
  useEffect(() => {
    if (copilotSteps[0].status === "done" && !tempValue.active) {
      resetSteps();
      setCopilotSteps((prev) => {
        const updatedState = [...prev];
        updatedState[0].status = "current";
        updatedState[1].status = "not_processed";
        updatedState[2].status = "not_processed";
        return updatedState;
      });
    }
    // TODO: I'd rather not disable this role,
    // as not having exhaustive deps is often the source of hard to track bugs
    // but the useTracker hook is returning
    // a new function at every render
    // which itself depends on the parameters passed to it
    // ideally we should address that issue there first
    // and then remove the disable here
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copilotSteps, tempValue]);

  // Trake if user is connected to an account and has Evmos
  useEffect(() => {
    if (copilotSteps[1].status === "current" && !tempEvmosBalance) {
      connectedWithTokensEvent();
      setCopilotSteps((prev) => {
        const updatedState = [...prev];
        updatedState[1].status = "done";
        updatedState[2].status = "current";
        return updatedState;
      });
    }
    // TODO: I'd rather not disable this role,
    // as not having exhaustive deps is often the source of hard to track bugs
    // but the useTracker hook is returning
    // a new function at every render
    // which itself depends on the parameters passed to it
    // ideally we should address that issue there first
    // and then remove the disable here
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copilotSteps, tempEvmosBalance]);

  // Track if user is connected to an account and has no Evmos
  useEffect(() => {
    if (
      copilotSteps[1].status === "current" &&
      tempEvmosBalance &&
      tempValue.active
    ) {
      connectedWithoutTokensEvent();
    }
    // TODO: I'd rather not disable this role,
    // as not having exhaustive deps is often the source of hard to track bugs
    // but the useTracker hook is returning
    // a new function at every render
    // which itself depends on the parameters passed to it
    // ideally we should address that issue there first
    // and then remove the disable here
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copilotSteps, tempEvmosBalance, tempValue]);

  const stepsToDraw = useMemo(() => {
    if (copilotSteps.length === 1) {
      return;
    }
    return copilotSteps.map((step) => {
      return <StepsContainerDapp key={step.title} step={step} />;
    });
  }, [copilotSteps]);

  const drawButton = useMemo(() => {
    return copilotSteps.map((item) => {
      return <div key={item.index}>{item.buttonDapp(item.status)}</div>;
    });
  }, [copilotSteps]);

  useEffect(() => {
    async function getSequenceNumber() {
      if (tempValue.evmosAddressCosmosFormat === "") {
        setSequence(false);
        return;
      }
      const sequenceNumber = await getSequence(
        "https://rest.evmos.lava.build",
        tempValue.evmosAddressCosmosFormat
      );
      if (sequenceNumber === "0" || sequenceNumber === null) {
        setSequence(false);
        return;
      }
      if (sequenceNumber !== "0") {
        setSequence(true);
      }
    }

    void getSequenceNumber();
  }, [sequence, tempValue]);

  return { stepsToDraw, drawButton, sequence };
};
