import { test, describe, vi, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_ON_NEXT_STEPS_COPILOT, disableMixpanel } from "tracker";

import { TopupSuccessMessage } from "./topup-success-message";
import { CopilotContext } from "../../copilot";

// same as vitest.setup.ts
const TOKEN = "testToken";

describe("Testing Top up success message", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return (
      <CopilotContext.Provider
        value={{
          flowId: "setup-account",
          nextStep: vi.fn(),
          prevStep: vi.fn(),
          setIsCompleted: vi.fn(),
          isCompleted: false,
          activeStep: "",
          setActiveStep: vi.fn(),
          hasNextStep: 2 < 3 - 1,
          hasPrevStep: 2 > 0,
          steps: [
            {
              id: "setup-account",
              isActive: true,
              isCompleted: false,
            },
          ],

          _init: vi.fn(),
        }}
      >
        {children}
      </CopilotContext.Provider>
    );
  };
  test("should call mixpanel event for clicking on next steps", async () => {
    const { findByRole } = render(<TopupSuccessMessage />, {
      wrapper,
    });
    const button = await findByRole("button", { name: "Next steps" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_NEXT_STEPS_COPILOT, {
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for clicking on next steps", async () => {
    disableMixpanel();
    const { findByRole } = render(<TopupSuccessMessage />, {
      wrapper,
    });
    const button = await findByRole("button", { name: "Next steps" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
