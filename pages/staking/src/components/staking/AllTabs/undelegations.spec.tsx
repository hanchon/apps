// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import { CLICK_CANCEL_UNDELEGATION_BUTTON, disableMixpanel } from "tracker";
import Undelegations from "./Undelegations";
import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";
import { SearchWrapper } from "../../context/SearchContext";
// same as vitest.setup.ts
const TOKEN = "testToken";
vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

vi.mock("../../../utils/hooks/useStakingInfo", () => ({
  useStakingInfo: () => {
    return {
      undelegations: [
        {
          delegator_address: "test",
          entries: [
            {
              balance: "123",
              completion_time: "",
              creation_height: "",
              initial_balance: "",
            },
          ],
          validator: {
            commission: {
              commission_rates: {
                max_change_rate: "test",
                max_rate: "test",
                rate: "test",
              },
            },
            update_time: "test",
            consensus_key: {
              type_url: "test",
              value: "test",
            },
            delegator_shares: "test",
            description: {
              details: "test",
              identity: "test",
              moniker: "123",
              security_contract: "test",
              website: "test",
            },
            jailed: false,
            min_self_delegation: "test",
            operator_address: "test",
            rank: 1,
            status: "test",
            tokens: "test",
            unbonding_height: "test",
            unbonding_time: "test",
          },
          validator_address: "test",
        },
      ],
    };
  },
}));
describe("Testing Branding", () => {
  const ResizeObserver = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  const wrapper = ({ children }: { children: JSX.Element }) => {
    return (
      <RootProviders>
        <SearchWrapper>{children}</SearchWrapper>
      </RootProviders>
    );
  };

  test("should call mixpanel event for undelegations ", async () => {
    vi.stubGlobal("ResizeObserver", ResizeObserver);
    const { getByLabelText } = render(<Undelegations />, { wrapper });
    const button = getByLabelText(/start undelegations/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_CANCEL_UNDELEGATION_BUTTON,
      {
        token: TOKEN,
      }
    );
    vi.unstubAllGlobals();
  });

  test("should not call mixpanel event for undelegations ", async () => {
    disableMixpanel();
    vi.stubGlobal("ResizeObserver", ResizeObserver);
    const { getByLabelText } = render(<Undelegations />, { wrapper });
    const button = getByLabelText(/start undelegations/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
