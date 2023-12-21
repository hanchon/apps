// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import {
  SELECT_FROM_NETWORK_SEND_FLOW,
  SELECT_TOKEN_SEND_FLOW,
  disableMixpanel,
} from "tracker";
import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";
import { AssetSelector } from "./AssetSelector";

// same as vitest.setup.ts
const TOKEN = "testToken";
// eslint-disable-next-line no-secrets/no-secrets
const ADDRESS = "evmos14uepnqnvkuyyvwe65wmncejq5g2f0tjft3wr65";
vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

describe("Testing Assets Selector", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event when changing token", async () => {
    const { findByText, getByTestId } = render(
      <AssetSelector
        value={{
          networkPrefix: "evmos",
          ref: "evmos:EVMOS",
          amount: 0n,
        }}
        onChange={vi.fn()}
        address={ADDRESS}
      />,
      {
        wrapper,
      }
    );

    const text = await findByText(/token/i);
    expect(text).toBeDefined();
    const button = getByTestId(/asset-selector-token-selector-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    const buttonEvmos = getByTestId(
      /asset-selector-token-selector-option-EVMOS/i
    );
    expect(buttonEvmos).toBeDefined();
    await userEvent.click(buttonEvmos);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(SELECT_TOKEN_SEND_FLOW, {
      Token: "EVMOS",
      "User Wallet Address": undefined,
      "Wallet Provider": null,
      token: TOKEN,
    });
    expect(mixpanel.track).toHaveBeenCalledWith(SELECT_FROM_NETWORK_SEND_FLOW, {
      Network: "evmos",
      "User Wallet Address": undefined,
      "Wallet Provider": null,
      token: TOKEN,
    });
    expect(mixpanel.track).toHaveBeenCalledTimes(2);
  });

  test("should not call mixpanel event when changing token", async () => {
    disableMixpanel();
    const { findByText, getByTestId } = render(
      <AssetSelector
        value={{
          networkPrefix: "evmos",
          ref: "evmos:EVMOS",
          amount: 0n,
        }}
        onChange={vi.fn()}
        address={ADDRESS}
      />,
      {
        wrapper,
      }
    );

    const text = await findByText(/token/i);
    expect(text).toBeDefined();
    const button = getByTestId(/asset-selector-token-selector-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    const buttonEvmos = getByTestId(
      /asset-selector-token-selector-option-EVMOS/i
    );
    expect(buttonEvmos).toBeDefined();
    await userEvent.click(buttonEvmos);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event when changing network", async () => {
    const { findByText, getByTestId } = render(
      <AssetSelector
        value={{
          networkPrefix: "evmos",
          ref: "evmos:EVMOS",
          amount: 0n,
        }}
        onChange={vi.fn()}
        address={ADDRESS}
      />,
      {
        wrapper,
      }
    );
    const text = await findByText(/token/i);
    expect(text).toBeDefined();
    const button = getByTestId(/asset-selector-network-selector-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    const buttonEvmos = getByTestId(
      /asset-selector-network-selector-option-EVMOS/i
    );
    expect(buttonEvmos).toBeDefined();
    await userEvent.click(buttonEvmos);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(SELECT_FROM_NETWORK_SEND_FLOW, {
      Network: "evmos",
      "User Wallet Address": undefined,
      "Wallet Provider": null,
      token: TOKEN,
    });
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });

  test("should not call mixpanel event when changing network", async () => {
    disableMixpanel();
    const { findByText, getByTestId } = render(
      <AssetSelector
        value={{
          networkPrefix: "evmos",
          ref: "evmos:EVMOS",
          amount: 0n,
        }}
        onChange={vi.fn()}
        address={ADDRESS}
      />,
      {
        wrapper,
      }
    );
    const text = await findByText(/token/i);
    expect(text).toBeDefined();
    const button = getByTestId(/asset-selector-network-selector-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    const buttonEvmos = getByTestId(
      /asset-selector-network-selector-option-EVMOS/i
    );
    expect(buttonEvmos).toBeDefined();
    await userEvent.click(buttonEvmos);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
