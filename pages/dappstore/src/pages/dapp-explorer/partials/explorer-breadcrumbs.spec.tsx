import { test, describe, expect, vi, beforeAll } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import {
  CLICK_ON_BREADCRUMB,
  CLICK_ON_PARTICIPATE_IN_GOVERNANCE,
  disableMixpanel,
} from "tracker";

import { ExplorerBreadcrumbs } from "./explorer-breadcrumbs";
import { fetchExplorerData } from "../../../lib/fetch-explorer-data";

// same as vitest.setup.ts

const TOKEN = "testToken";

describe("Testing Ecosystem Card", () => {
  test("should call mixpanel event for featured dapp", async () => {
    const { getByLabelText, debug } = render(
      await ExplorerBreadcrumbs({
        params: {
          category: "All",
          dapp: "Test",
        },
      })
    );

    debug();
    const button = getByLabelText(/All/i);
    expect(button).toBeDefined();

    await userEvent.click(button);

    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_BREADCRUMB, {
      //   Breadcrumb: "",
      //   token: TOKEN,
    });
    // debug();
  });
});
