import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import { CLICK_ON_PARTICIPATE_IN_GOVERNANCE, disableMixpanel } from "tracker";
import { GovernanceCard } from "./governance-card";
import React, { ReactElement } from "react";

// same as vitest.setup.ts
const TOKEN = "testToken";

describe("Testing Ecosystem Card", () => {
  test("should call mixpanel event for featured dapp", async () => {
    const { getByLabelText } = render(<GovernanceCard />);
    const button = getByLabelText(/governance card/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_ON_PARTICIPATE_IN_GOVERNANCE,
      {
        "dApp Name": "Transak",
        token: TOKEN,
      }
    );
  });

  test("should not call mixpanel event for featured dapp", async () => {
    disableMixpanel();
    const { getByLabelText } = render(<GovernanceCard />);
    const button = getByLabelText(/governance card/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalledWith(
      CLICK_ON_PARTICIPATE_IN_GOVERNANCE,
      {
        token: TOKEN,
      }
    );
  });
});
