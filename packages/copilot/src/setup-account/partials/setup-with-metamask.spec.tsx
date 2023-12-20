import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_ON_INSTALL_ACCOUNT_COPILOT, disableMixpanel } from "tracker";
import TabNavItem from "./TabNavItem";
import { SetupWithMetamaskSteps } from "./setup-with-metamask";

// same as vitest.setup.ts
const TOKEN = "testToken";

describe("Testing Setup With Metamask ", () => {
  test("should call mixpanel event for tab navItem - Staking", async () => {
    const { debug } = render(<SetupWithMetamaskSteps />);
    debug();
  });
});
