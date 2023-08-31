import { test, describe, expect, vi } from "vitest";
import { getByRole, getByTestId, render } from "@testing-library/react";
import { StatefulHeader } from "../StatefulHeader";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { MixpanelProvider } from "tracker";

describe("Testing Header - mixpanel is not setted", () => {
  vi.mock("mixpanel-browser", () => {
    return {
      default: {
        init: vi.fn(),
        track: vi.fn(),
      },
    };
  });

  vi.mock("react-redux", () => {
    return {
      useDispatch: vi.fn(),
      useSelector: vi.fn(),
    };
  });

  vi.mock("evmos-wallet", () => {
    return {
      ButtonWalletConnection: vi.fn(),
      StoreType: vi.fn(),
      useAssets: vi.fn(() => ({
        evmosPriceFixed: 123, // Replace with the appropriate value
        // Other properties you might need
      })),
      WalletConnection: vi.fn(),
    };
  });

  test("should not call mixpanel after clicking on feedback", () => {
    const wrapperWithoutToken = ({ children }: { children: JSX.Element }) => {
      return (
        <MixpanelProvider token="" config={{ ip: false }}>
          {children}
        </MixpanelProvider>
      );
    };

    const { getByText } = render(
      <StatefulHeader pageName="Portfolio" page="assets" />,
      {
        wrapper: wrapperWithoutToken,
      }
    );
    const element = getByText("Portfolio");
    expect(element).toBeDefined();
    // const launchPadButton = getByRole(role)
    // launchpad-button
    //   data-testid="proposal-card-title"
    // await userEvent.click(element);
    // expect(mixpanel.init).toHaveBeenCalledOnce();
    // expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
