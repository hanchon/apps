// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import { CLICK_ON_PARTICIPATE_IN_GOVERNANCE, disableMixpanel } from "tracker";
import { GovernanceCard } from "./governance-card";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

describe("Testing Governance Card", () => {
  test("should call mixpanel event for click on participate in governance", async () => {
    const { findByLabelText } = render(<GovernanceCard />);
    const button = await findByLabelText(/governance card/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_ON_PARTICIPATE_IN_GOVERNANCE,
      {
        token: MIXPANEL_TOKEN_FOR_TEST,
      }
    );
  });

  test("should not call mixpanel event for click on participate in governance", async () => {
    disableMixpanel();
    const { findByLabelText } = render(<GovernanceCard />);
    const button = await findByLabelText(/governance card/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
