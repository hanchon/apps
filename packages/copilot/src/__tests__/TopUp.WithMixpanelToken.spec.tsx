import { TopUp } from "../copilot/steps/topUp/TopUp";
import { describe, expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MixpanelProvider } from "tracker";

describe("TopUp component", () => {
  vi.mock("react-redux", () => {
    return {
      useDispatch: vi.fn(),
      useSelector: vi.fn(),
    };
  });

  vi.mock("mixpanel-browser", () => {
    return {
      default: {
        init: vi.fn(),
        config: {},
        track: vi.fn(),
      },
    };
  });

  vi.mock("@evmosapps/evmos-wallet", () => {
    return {};
  });

  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: JSX.Element }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <MixpanelProvider token="testToken" config={{ ip: false }}>
          {children}
        </MixpanelProvider>
      </QueryClientProvider>
    );
  };

  test.skip("should render the correct screen depending on the selected top-up type", async () => {
    const { getByText, getByRole, getByTestId } = render(<TopUp />, {
      wrapper,
    });

    expect(getByText(/Top up your account/i)).toBeDefined();
    const cardButton = getByRole("button", { name: /debit\/credit card/i });
    expect(cardButton).toBeDefined();

    const defaultCardOption = getByText(/C14/i);
    expect(defaultCardOption).toBeDefined();

    const dropdownProvider = getByTestId("card-provider-dropdown");
    expect(dropdownProvider).toBeDefined();
    await userEvent.click(dropdownProvider);
    const transakOption = getByText(/Transak/i);
    expect(transakOption).toBeDefined();

    await userEvent.click(dropdownProvider);
    const c14Option = getByText(/C14/i);
    expect(c14Option).toBeDefined();

    const cryptoButton = getByRole("button", { name: /cryptocurrencies/i });
    expect(cryptoButton).toBeDefined();

    const defaultCryptoOption = getByText(/Squid/i);
    expect(defaultCryptoOption).toBeDefined();

    await userEvent.click(dropdownProvider);
    const layerSwapOption = getByText(/layerswap/i);
    expect(layerSwapOption).toBeDefined();

    await userEvent.click(dropdownProvider);
    const cypherOption = getByText(/cypher wallet/i);
    expect(cypherOption).toBeDefined();

    await userEvent.click(dropdownProvider);
    const squidOption = getByText(/squid/i);
    expect(squidOption).toBeDefined();
  });
});
