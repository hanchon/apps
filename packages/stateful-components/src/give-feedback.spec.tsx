// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import { CLICK_ON_GIVE_FEEDBACK, disableMixpanel } from "tracker";
import { GiveFeedback } from "./give-feedback";

// same as vitest.setup.ts
const TOKEN = "testToken";
describe("Testing Branding", () => {
  test("should call mixpanel event for CLICK_ON_GIVE_FEEDBACK", async () => {
    const { getByLabelText } = render(<GiveFeedback />);
    const button = getByLabelText(/Give Feedback/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_GIVE_FEEDBACK, {
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for CLICK_ON_GIVE_FEEDBACK", async () => {
    disableMixpanel();
    const { getByLabelText } = render(<GiveFeedback />);

    const button = getByLabelText(/Give Feedback/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
