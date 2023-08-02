// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { NextSteps } from "../steps/nextSteps/NextSteps";
import { SetUpAccountContainer } from "../steps/setUpAccount/SetUpAccountContainer";
import { STEP_STATUS } from "../steps/setUpAccount/buttons/utils";
import { TopUp } from "../steps/topUp/TopUp";

export const steps = [
  {
    title: "Set up your account",
    component: <SetUpAccountContainer />,
    status: STEP_STATUS.CURRENT,
  },
  {
    title: "Top up your account",
    component: <TopUp />,
    status: STEP_STATUS.NOT_PROCESSED,
  },
  {
    title: "Next steps",
    component: <NextSteps />,
    status: STEP_STATUS.NOT_PROCESSED,
  },
];

export const topUpStep = [
  {
    title: "Top up your account",
    component: <TopUp />,
    status: STEP_STATUS.CURRENT,
  },
];
