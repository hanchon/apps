import { test, describe, expect, vi, beforeAll } from "vitest";
import { getByText, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import {
  CLICK_ON_BREADCRUMB,
  CLICK_ON_PARTICIPATE_IN_GOVERNANCE,
  disableMixpanel,
} from "tracker";

import { ExplorerBreadcrumbs } from "./explorer-breadcrumbs";

import { PropsWithChildren } from "react";

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

vi.mock("react", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),

    cache: (fn: unknown) => fn,
  };
});

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

describe("Testing Ecosystem Card", () => {
  test("should call mixpanel event for featured dapp", async () => {
    const { getByText, debug } = render(
      await ExplorerBreadcrumbs({
        params: {
          category: MOCK_CATEGORIES[2]!.slug,
          dapp: MOCK_DAPPS[1]!.slug,
        },
      })
    );

    debug();
    const button = getByText(MOCK_CATEGORIES[2]!.name);
    expect(button).toBeDefined();

    await userEvent.click(button);

    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_BREADCRUMB, {
      Breadcrumb: MOCK_CATEGORIES[2]!.name,
      token: TOKEN,
    });
    // debug();
  });
});
