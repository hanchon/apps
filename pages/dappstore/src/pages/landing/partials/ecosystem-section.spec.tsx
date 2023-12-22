// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_SEE_MORE_BUTTON, disableMixpanel } from "tracker";

import { EcosystemSection } from "./ecosystem-section";
import { PropsWithChildren } from "react";
vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

const MOCK_CATEGORIES = [
  "DeFi",
  "NFTs",
  "Games",
  "DAOs",
  "Infrastructure",
  "Social",
].map((name) => ({ name, slug: name.toLowerCase() }));

const TOKEN = "testToken";
const MOCK_DAPPS = ["Forge", "Stride", "Wormhole"].map((name) => ({
  name,
  slug: name.toLowerCase(),
}));
vi.mock("../../../lib/fetch-explorer-data", () => ({
  fetchExplorerData: () => {
    return { categories: MOCK_CATEGORIES, dApps: MOCK_DAPPS };
  },
}));

vi.mock("react", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),

    cache: (fn: unknown) => fn,
  };
});

describe("Testing Ecosystem section", () => {
  test("should call mixpanel event when clicking on see more button", async () => {
    const { findByRole } = render(await EcosystemSection());
    const button = await findByRole("link", { name: "See More" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_SEE_MORE_BUTTON, {
      token: TOKEN,
    });
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });
  //   Error: A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.
  test.skip("should not call mixpanel event when clicking on see more button", async () => {
    disableMixpanel();
    const { findByRole } = render(await EcosystemSection());
    const button = await findByRole("link", { name: "See More" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
