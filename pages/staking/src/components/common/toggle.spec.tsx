import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_TOGGLE_FOR_VALIDATORS, disableMixpanel } from "tracker";
import ValidatorToggle from "./Toggle";
import { ValidatorStateWrapper } from "../context/ValidatorStateContext";

// same as vitest.setup.ts
const TOKEN = "testToken";

describe("Testing Toggle Validators ", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <ValidatorStateWrapper>{children}</ValidatorStateWrapper>;
  };

  test("should call mixpanel event for show inactive validators", async () => {
    const { getByText } = render(<ValidatorToggle />, { wrapper });
    const button = getByText(/Show Inactive/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_TOGGLE_FOR_VALIDATORS, {
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for show inactive validators", async () => {
    disableMixpanel();
    const { getByText } = render(<ValidatorToggle />, { wrapper });
    const button = getByText(/Show Inactive/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
