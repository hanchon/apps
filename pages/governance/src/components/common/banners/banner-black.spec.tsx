import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import {
  CLICK_COMMONWEALTH_OUTLINK,
  CLICK_ON_FEATURED_DAPP,
  disableMixpanel,
} from "tracker";
import BannerBlack from "./BannerBlack";
import { COMMONWEALTH_URL } from "constants-helper";
import { WalletProvider } from "@evmosapps/evmos-wallet";

// same as vitest.setup.ts
const TOKEN = "testToken";

describe("Testing Ecosystem Card", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <WalletProvider>{children}</WalletProvider>;
  };

  test("should call mixpanel event for featured dapp", async () => {
    const { getByLabelText } = render(
      <BannerBlack text="Test" href={COMMONWEALTH_URL} />,
      { wrapper }
    );
    const button = getByLabelText(/Transak/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FEATURED_DAPP, {
      "dApp Name": "Transak",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for featured dapp", async () => {
    disableMixpanel();
    const { getByRole } = render(
      <BannerBlack text="Test" href={COMMONWEALTH_URL} />
    );
    const button = getByRole("link", { name: "Test" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
