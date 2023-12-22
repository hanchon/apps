// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import { CLICK_ON_SEE_PORTFOLIO, disableMixpanel } from "tracker";

import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";
import { AssetsCard } from "./assets-card";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

describe("Testing Staking Card", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for click on see porftolio", async () => {
    const { findByRole } = render(<AssetsCard />, { wrapper });
    const button = await findByRole("link", { name: "See Portfolio" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_SEE_PORTFOLIO, {
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for click on see porftolio", async () => {
    disableMixpanel();
    const { findByRole } = render(<AssetsCard />, { wrapper });
    const button = await findByRole("link", { name: "See Portfolio" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
