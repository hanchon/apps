// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import {
  CLICK_ON_VIEW_ALL_DAPPS,
  COMPLETED_COPILOT_ONBOARDING,
  disableMixpanel,
} from "tracker";
import { ButtonsNextSteps } from "./button-next-steps";

// same as vitest.setup.ts
const TOKEN = "testToken";

describe("Testing Top up success message", () => {
  test("should call mixpanel event for clicking on interact with dapp", async () => {
    const { findByLabelText } = render(<ButtonsNextSteps />);
    const button = await findByLabelText("interact with dapp");
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_VIEW_ALL_DAPPS, {
      Location: "Inside Copilot",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for clicking on interact with dapp", async () => {
    disableMixpanel();
    const { findByLabelText } = render(<ButtonsNextSteps />);
    const button = await findByLabelText("interact with dapp");
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for clicking on learn more", async () => {
    const { findByLabelText } = render(<ButtonsNextSteps />);
    const button = await findByLabelText("learn more");
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(COMPLETED_COPILOT_ONBOARDING, {
      "Completed Copilot Onboarding": "Learn More",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for clicking on learn more", async () => {
    disableMixpanel();
    const { findByLabelText } = render(<ButtonsNextSteps />);
    const button = await findByLabelText("learn more");
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for clicking on Stake your evmos", async () => {
    const { findByLabelText } = render(<ButtonsNextSteps />);
    const button = await findByLabelText("stake your evmos");
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(COMPLETED_COPILOT_ONBOARDING, {
      "Completed Copilot Onboarding": "Stake your Evmos",
      token: TOKEN,
    });
  });
  test("should not call mixpanel event for clicking on Stake your evmos", async () => {
    disableMixpanel();
    const { findByLabelText } = render(<ButtonsNextSteps />);
    const button = await findByLabelText("stake your evmos");
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
