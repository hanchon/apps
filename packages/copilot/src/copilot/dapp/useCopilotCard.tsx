"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext, useEffect, useMemo, useState } from "react";
import { StepsContainerDapp } from "./StepsContainarDapp";
import {
  StoreType,
  getSequence,
  useEvmosBalance,
} from "@evmosapps/evmos-wallet";
import { useSelector } from "react-redux";
import { setupSteps } from "../container/data";
import {
  USER_CONNECTED_AND_HAS_NO_TOKENS,
  USER_CONNECTED_AND_HAS_TOKENS,
  USER_NOT_CONNECTED,
  useTracker,
} from "tracker";
import { StepsContext } from "../container/StepsContext";
import { useEffectEvent } from "helpers";

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

  const setCurrentStep = useEffectEvent((step: number) => {
    setCopilotSteps((prev) => {
      return prev.map((item) => ({
        ...item,
        status:
          item.index < step
            ? "done"
            : item.index === step
            ? "current"
            : "not_processed",
      }));
    });
  });
  // Track if user is not connected to an account
  useEffect(() => {
    if (copilotSteps[0]?.status === "current" && !tempValue.active) {
      //
      notConnected();
    }
  }, [copilotSteps, notConnected, tempValue]);

  // Update status of the steps
  useEffect(() => {
    if (copilotSteps[0]?.status === "current" && tempValue.active) {
      setCurrentStep(1);
    }
  }, [copilotSteps, setCurrentStep, tempValue]);

  // Reset steps
  useEffect(() => {
    if (copilotSteps[0]?.status === "done" && !tempValue.active) {
      resetSteps();
      setCurrentStep(0);
    }
  }, [copilotSteps, resetSteps, setCurrentStep, tempValue]);

  // Trake if user is connected to an account and has Evmos
  useEffect(() => {
    if (copilotSteps[1]?.status === "current" && !tempEvmosBalance) {
      connectedWithTokensEvent();
      setCurrentStep(2);
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
      copilotSteps[1]?.status === "current" &&
      tempEvmosBalance &&
      tempValue.active
    ) {
      connectedWithoutTokensEvent();
    }
  }, [connectedWithoutTokensEvent, copilotSteps, tempEvmosBalance, tempValue]);

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
