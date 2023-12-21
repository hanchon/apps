// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { SELECT_TO_NETWORK_SEND_FLOW, disableMixpanel } from "tracker";
import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";
import { AccountSelector } from "./AccountSelector";

// same as vitest.setup.ts
const TOKEN = "testToken";
// eslint-disable-next-line no-secrets/no-secrets

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

describe("Testing Account Selector", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event when changing network (TO)", async () => {
    const { findByTestId, getByTestId } = render(
      <AccountSelector
        onChange={vi.fn()}
        networkOptions={["stride", "evmos"]}
        senderPrefix="evmos"
      />,
      {
        wrapper,
      }
    );
    const button = await findByTestId(
      /account-selector-network-selector-button/i
    );
    expect(button).toBeDefined();
    await userEvent.click(button);
    const buttonEvmos = getByTestId(
      /account-selector-network-selector-option-EVMOS/i
    );
    expect(buttonEvmos).toBeDefined();
    await userEvent.click(buttonEvmos);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(SELECT_TO_NETWORK_SEND_FLOW, {
      Network: "evmos",
      "User Wallet Address": undefined,
      "Wallet Provider": null,
      token: TOKEN,
    });
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });

  test("should not call mixpanel event when changing network (TO)", async () => {
    disableMixpanel();
    const { findByTestId, getByTestId } = render(
      <AccountSelector
        onChange={vi.fn()}
        networkOptions={["stride", "evmos"]}
        senderPrefix="evmos"
      />,
      {
        wrapper,
      }
    );
    const button = await findByTestId(
      /account-selector-network-selector-button/i
    );
    expect(button).toBeDefined();
    await userEvent.click(button);
    const buttonEvmos = getByTestId(
      /account-selector-network-selector-option-EVMOS/i
    );
    expect(buttonEvmos).toBeDefined();
    await userEvent.click(buttonEvmos);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
