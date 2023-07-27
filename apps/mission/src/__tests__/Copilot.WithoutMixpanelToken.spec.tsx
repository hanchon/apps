import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { MixpanelProvider } from "tracker";
import { Copilot } from "../components/copilot/Copilot";

describe.skip("Testing Copilot - mixpanel is not setted", () => {
  vi.mock("mixpanel-browser", async () => {
    return {
      default: {
        init: vi.fn(),
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

  test.skip("should not call mixpanel after clicking on copilot", async () => {
    const wrapperWithoutToken = ({ children }: { children: JSX.Element }) => {
      return (
        <MixpanelProvider token="" config={{ ip: false }}>
          {children}
        </MixpanelProvider>
      );
    };

    const { getByText } = render(<Copilot />, {
      wrapper: wrapperWithoutToken,
    });
    const element = getByText("Copilot");
    expect(element).toBeDefined();
    await userEvent.click(element);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
