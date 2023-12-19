import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import {
  CLICK_ON_BREADCRUMB,
  CLICK_ON_PARTICIPATE_IN_GOVERNANCE,
  disableMixpanel,
} from "tracker";

import { ExplorerBreadcrumbs } from "./explorer-breadcrumbs";

// same as vitest.setup.ts
const TOKEN = "testToken";

describe("Testing Ecosystem Card", () => {
  test("should call mixpanel event for featured dapp", async () => {
    const { getByLabelText } = render(
      <ExplorerBreadcrumbs
        params={{
          category: "All",
          dapp: "Test",
        }}
      />
    );

    const button = getByLabelText(/All/i);
    expect(button).toBeDefined();
    // debug();
    await userEvent.click(button);

    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_BREADCRUMB, {
      //   Breadcrumb: "",
      //   token: TOKEN,
    });
    // debug();
  });
});
