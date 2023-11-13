"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { STEP_STATUS } from "constants-helper";

type StepsPropsContext = {
  stepsStatus: {
    status: string;
    index: number;
    component: JSX.Element;
    title: string;
    buttonDapp: (status: string) => JSX.Element;
  }[];
  updateStepsStatus: () => void;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  setIsOpenCloseModal: Dispatch<SetStateAction<boolean>>;
  showCloseModal: boolean;
  resetSteps: () => void;
  hasSingleTopUpStep: boolean;
};

const StepsContext = createContext<StepsPropsContext>({
  stepsStatus: [],
  updateStepsStatus: () => {
    /**/
  },
  setIsOpenModal: () => {
    /**/
  },
  showModal: false,
  showCloseModal: false,
  setIsOpenCloseModal: () => {
    /**/
  },
  resetSteps: () => {
    /**/
  },
  hasSingleTopUpStep: false,
});

const StepsContextProvider = ({
  children,
  steps,
}: PropsWithChildren<{
  steps: {
    title: string;
    component: JSX.Element;
    status: string;
    buttonDapp: (status: string) => JSX.Element;
  }[];
}>) => {
  const initialValue = steps.map((step, index) => ({
    status: step.status,
    index,
    component: step.component,
    title: step.title,
    buttonDapp: step.buttonDapp,
  }));

  const [stepsStatus, setStepsStatus] = useState(initialValue);
  const [showModal, setIsOpenModal] = useState(false);
  const [showCloseModal, setIsOpenCloseModal] = useState(false);

  const updateStepsStatus = () => {
    const updatedState = [...stepsStatus];
    const currentElement = updatedState.find(
      (element) => element.status === STEP_STATUS.CURRENT
    );
    if (currentElement === undefined) {
      return;
    }
    const currentStep = updatedState[currentElement.index];
    if (currentStep === undefined) {
      return;
    }
    const updatedStep = { ...currentStep, status: STEP_STATUS.DONE };
    const nextStep = updatedState[currentElement.index + 1];
    if (nextStep) {
      const nextStepUpdated = { ...nextStep, status: STEP_STATUS.CURRENT };
      updatedState[currentElement.index] = updatedStep;
      updatedState[currentElement.index + 1] = nextStepUpdated;
    }
    setStepsStatus(updatedState);
  };

  function resetSteps() {
    setStepsStatus(initialValue);
  }

  function hasSingleTopUpStep() {
    if (steps.length === 1 && steps[0]?.title === "Top up your account") {
      return true;
    }
    return false;
  }

  return (
    <StepsContext.Provider
      value={{
        stepsStatus,
        updateStepsStatus,
        setIsOpenModal,
        showModal,
        showCloseModal,
        setIsOpenCloseModal,
        resetSteps,
        hasSingleTopUpStep: hasSingleTopUpStep(),
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};

export { StepsContext, StepsContextProvider };
