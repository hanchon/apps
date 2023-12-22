// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import { CLICK_ON_STAKE_AND_MANAGE_DELEGATION, disableMixpanel } from "tracker";
import { StakingCard } from ".";
import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";

// same as vitest.setup.ts
const TOKEN = "testToken";
vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

describe.skip("Testing Staking Card", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for click on participate in Staking", async () => {
    const { findByText } = render(<StakingCard />, { wrapper });
    const button = await findByText(
      "Earn rewards for participating in the network's security"
    );
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_ON_STAKE_AND_MANAGE_DELEGATION,
      {
        token: TOKEN,
      }
    );
  });

  test("should not call mixpanel event for click on participate in Staking", async () => {
    disableMixpanel();
    const { findByRole } = render(<StakingCard />, { wrapper });
    const button = await findByRole("button", {
      name: /Stake & manage delegations/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
