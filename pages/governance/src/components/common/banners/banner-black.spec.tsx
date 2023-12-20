import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import { CLICK_COMMONWEALTH_OUTLINK, disableMixpanel } from "tracker";
import BannerBlack from "./BannerBlack";
import { COMMONWEALTH_URL } from "constants-helper";

import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";
// same as vitest.setup.ts
const TOKEN = "testToken";
const TEXT = "Test";
describe("Testing Banner Black", () => {
  vi.mock("@tanstack/react-query-next-experimental", () => ({
    ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) =>
      props.children,
  }));
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event for commonwealth link", async () => {
    const { getByText } = render(
      <BannerBlack text={TEXT} href={COMMONWEALTH_URL} />,
      { wrapper }
    );
    const button = getByText(/Test/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_COMMONWEALTH_OUTLINK, {
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for fcommonwealth link", async () => {
    disableMixpanel();
    const { getByText } = render(
      <BannerBlack text={TEXT} href={COMMONWEALTH_URL} />,
      { wrapper }
    );
    const button = getByText(/Test/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
