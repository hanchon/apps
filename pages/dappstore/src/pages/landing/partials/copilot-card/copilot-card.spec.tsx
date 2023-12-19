import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import { CLICK_ON_PARTICIPATE_IN_GOVERNANCE, disableMixpanel } from "tracker";
import { CopilotCard } from "./copilot-card";

// same as vitest.setup.ts
const TOKEN = "testToken";

describe("Testing Ecosystem Card", () => {
  test("should call mixpanel event for featured dapp", async () => {
    const { getByLabelText, debug } = render(<CopilotCard />);
    debug();
  });
});
