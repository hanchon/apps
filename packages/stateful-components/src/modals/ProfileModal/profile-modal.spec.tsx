// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import { CLICK_DISCONNECT_WALLET_BUTTON, disableMixpanel } from "tracker";

import { ProfileModal } from "./ProfileModal";
import { RootProviders } from "../../root-providers";
import { PropsWithChildren } from "react";

// same as vitest.setup.ts
const TOKEN = "testToken";
const ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

vi.mock("wagmi", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    useAccount: () => {
      return {
        isDisconnected: false,
        address: "0x1234567890123456789012345678901234567890",
        connector: {
          id: "metaMask",
        },
      };
    },
  };
});

vi.mock("helpers", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    useModal: () => ({
      isOpen: true,
      setIsOpen: vi.fn(),
    }),
  };
});

describe("Testing Profile Modal", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for Disconnect wallet", async () => {
    const { getByRole } = render(<ProfileModal />, { wrapper });
    const button = getByRole("button", { name: /Disconnect/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_DISCONNECT_WALLET_BUTTON,
      {
        token: TOKEN,
      }
    );
  });

  test("should not  call mixpanel event for Disconnect wallet", async () => {
    vi.stubGlobal("ResizeObserver", ResizeObserver);
    disableMixpanel();
    const { getByRole } = render(<ProfileModal />, { wrapper });
    const button = getByRole("button", { name: /Disconnect/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
