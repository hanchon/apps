// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_TABS_STAKING_OPTIONS, disableMixpanel } from "tracker";
import TabsDropdown from "./TabsDropdown";
import { tabsContent } from "../../staking/Tabs/Content";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

describe("Testing Tab Dropdowns ", () => {
  test("should call mixpanel event for dropdown tabs - Staking", async () => {
    const { getByText } = render(
      <TabsDropdown content={tabsContent} setActiveTab={vi.fn()} />
    );

    const button = getByText(/Staking/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    const validators = getByText(/Validators/i);
    expect(validators).toBeDefined();
    await userEvent.click(validators);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_TABS_STAKING_OPTIONS, {
      Tab: "validators",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for dropdown tabs - Staking", async () => {
    disableMixpanel();
    const { getByText } = render(
      <TabsDropdown content={tabsContent} setActiveTab={vi.fn()} />
    );
    const button = getByText(/Staking/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    const validators = getByText(/Validators/i);
    expect(validators).toBeDefined();
    await userEvent.click(validators);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
