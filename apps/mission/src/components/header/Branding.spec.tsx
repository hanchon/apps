import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import { CLICK_EVMOS_LOGO, disableMixpanel } from "tracker";
import { Branding } from "./Branding";
// same as vitest.setup.ts
const TOKEN = "testToken";
describe("Testing Branding", () => {
  test("should call mixpanel event for Logo", async () => {
    const { getByLabelText } = render(<Branding />);
    const button = getByLabelText(/Home/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_EVMOS_LOGO, {
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for Logo", async () => {
    disableMixpanel();
    const { getByLabelText } = render(<Branding />);
    const button = getByLabelText(/Home/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalledWith(CLICK_EVMOS_LOGO, {
      token: TOKEN,
    });
  });
});
