import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_EVMOS_COPILOT_START_FLOW, MixpanelProvider } from "tracker";
import { Copilot } from "../components/copilot/Copilot";

describe("Testing Copilot", () => {
  vi.mock("mixpanel-browser", async () => {
    return {
      default: {
        init: vi.fn(),
        config: {},
        track: vi.fn(),
      },
    };
  });

  vi.mock("evmos-wallet", async () => {
    return {
      ButtonWalletConnection: vi.fn(),
      StoreType: vi.fn(),
    };
  });

  test("should call mixpanel after clicking on copilot", async () => {
    const wrapper = ({ children }: { children: JSX.Element }) => {
      return (
        <MixpanelProvider token="testToken" config={{ ip: false }}>
          {children}
        </MixpanelProvider>
      );
    };

    const { getByText } = render(<Copilot />, { wrapper });
    const element = getByText("Copilot");
    expect(element).toBeDefined();
    await userEvent.click(element);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_EVMOS_COPILOT_START_FLOW,
      {}
    );
  });
});
