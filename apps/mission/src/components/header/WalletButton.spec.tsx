// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { RootProviders } from "stateful-components/src/root-providers";
import { CLICK_CONNECT_WALLET_BUTTON, disableMixpanel } from "tracker";
import { WalletButton } from "./WalletButton";
import { PropsWithChildren } from "react";

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

vi.mock("react", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),

    cache: (fn: unknown) => fn,
    "server-only": {},
  };
});

// same as vitest.setup.ts
const TOKEN = "testToken";
describe("Testing Branding", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for Connect Wallet", async () => {
    const { getByTestId } = render(<WalletButton />, { wrapper });

    const button = getByTestId(/open-connect-modal/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_CONNECT_WALLET_BUTTON, {
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for Connect Wallet", async () => {
    disableMixpanel();
    const { getByTestId } = render(<WalletButton />, { wrapper });

    const button = getByTestId(/open-connect-modal/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
