// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import {
  CLICK_BUTTON_MANAGE_DELEGATE,
  CLICK_BUTTON_MANAGE_UNDELEGATE,
  CLICK_BUTTON_MANAGE_REDELEGATE,
  disableMixpanel,
} from "tracker";
import Staking from "./Staking";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// same as vitest.setup.ts
const TOKEN = "testToken";

const validator = {
  moniker: "Hanchon.live",
  commissionRate: "0.200000000000000000",
  balance: "1339000000000000",
  details: "",
  website: "",
  // eslint-disable-next-line no-secrets/no-secrets
  validatorAddress: "evmosvaloper1dgpv4leszpeg2jusx2xgyfnhdzghf3rf0qq22v",
};

describe("Testing Tab Dropdowns ", () => {
  vi.mock("@evmosapps/evmos-wallet", () => {
    return {
      EVMOS_DECIMALS: "18",
    };
  });

  vi.mock("react-redux", () => {
    return {
      useDispatch: vi.fn(),
      useSelector: vi.fn(),
    };
  });

  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: JSX.Element }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
  test("should call mixpanel event for delegate button - Staking", async () => {
    const { getByRole } = render(
      <Staking item={validator} setIsOpen={vi.fn()} />,
      { wrapper }
    );

    const button = getByRole("button", { name: "Delegate" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_BUTTON_MANAGE_DELEGATE, {
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for delegate button - Staking", async () => {
    disableMixpanel();
    const { getByRole } = render(
      <Staking item={validator} setIsOpen={vi.fn()} />,
      { wrapper }
    );

    const button = getByRole("button", { name: "Delegate" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for undelegate button - Staking", async () => {
    const { getByRole } = render(
      <Staking item={validator} setIsOpen={vi.fn()} />,
      { wrapper }
    );

    const button = getByRole("button", { name: "UNDELEGATE" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_BUTTON_MANAGE_UNDELEGATE,
      {
        token: TOKEN,
      }
    );
  });

  test("should not call mixpanel event for Undelegate button - Staking", async () => {
    disableMixpanel();
    const { getByRole } = render(
      <Staking item={validator} setIsOpen={vi.fn()} />,
      { wrapper }
    );

    const button = getByRole("button", { name: "UNDELEGATE" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for Redelegate button - Staking", async () => {
    const { getByRole } = render(
      <Staking item={validator} setIsOpen={vi.fn()} />,
      { wrapper }
    );

    const button = getByRole("button", { name: "Redelegate" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_BUTTON_MANAGE_REDELEGATE,
      {
        token: TOKEN,
      }
    );
  });

  test("should not call mixpanel event for Redelegate button - Staking", async () => {
    disableMixpanel();
    const { getByRole } = render(
      <Staking item={validator} setIsOpen={vi.fn()} />,
      { wrapper }
    );

    const button = getByRole("button", { name: "Redelegate" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
