// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_ON_INSTALL_ACCOUNT_COPILOT, disableMixpanel } from "tracker";
import TabNavItem from "./TabNavItem";
import { SetupWithMetamaskSteps } from "./setup-with-metamask";
import { RootProviders } from "stateful-components/src/root-providers";
// same as vitest.setup.ts
const TOKEN = "testToken";
vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

describe("Testing Setup With Metamask ", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for tab navItem - Staking", async () => {
    const { debug } = render(<SetupWithMetamaskSteps />, { wrapper });
    debug();
  });
});
