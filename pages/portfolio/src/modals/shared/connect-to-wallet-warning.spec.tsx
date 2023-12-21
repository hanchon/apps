// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { PROMPTED_TO, disableMixpanel } from "tracker";
import { PropsWithChildren } from "react";
import { ConnectToWalletWarning } from "./ConnectToWalletWarning";

// same as vitest.setup.ts
const TOKEN = "testToken";

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
describe("Testing Connect To Wallet Warning", () => {
  test("should call mixpanel event for connect in pay modal", async () => {
    const { findByRole } = render(
      <ConnectToWalletWarning modalType="Pay Modal" />
    );
    const button = await findByRole("button", { name: /connect/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(PROMPTED_TO, {
      Modal: "Pay Modal",
      "Prompt To": "Connect Account",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for connect in pay modal", async () => {
    disableMixpanel();
    const { findByRole } = render(
      <ConnectToWalletWarning modalType="Pay Modal" />
    );

    const button = await findByRole("button", { name: /connect/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
