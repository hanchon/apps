// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_SEARCH_VALIDATORS_INPUT, disableMixpanel } from "tracker";

import Search from "./Search";
import { SearchWrapper } from "../../context/SearchContext";

// same as vitest.setup.ts
const TOKEN = "testToken";

describe("Testing Toggle Validators ", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <SearchWrapper>{children}</SearchWrapper>;
  };

  test("should call mixpanel event for clicking on search validators", async () => {
    const { getByLabelText } = render(
      <Search placeholder="Search Validators" />,
      { wrapper }
    );
    const button = getByLabelText(/search validators/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_SEARCH_VALIDATORS_INPUT, {
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for clicking on search validators", async () => {
    disableMixpanel();
    const { getByLabelText } = render(
      <Search placeholder="Search Validators" />,
      { wrapper }
    );
    const button = getByLabelText(/search validators/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
