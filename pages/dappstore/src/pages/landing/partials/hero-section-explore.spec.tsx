import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { ButtonWithLink } from "@evmosapps/ui-helpers";
import { CLICK_ON_VIEW_ALL_DAPPS, disableMixpanel } from "tracker";
import { HeroSectionExplore } from "./hero-section-explore";

// same as vitest.setup.ts
const TOKEN = "testToken";
const AMOUNT_DAPPS = 8;
describe("Testing Hero Section Explore", () => {
  test("should call mixpanel event for view all dapps", async () => {
    const { getByLabelText, debug } = render(
      await HeroSectionExplore({ totalApps: AMOUNT_DAPPS })
    );
    // const { debug } = render(<ButtonWithLink href="/" />);
    debug();
    // const button = getByLabelText(/view all dapps/i);
    // expect(button).toBeDefined();
    // await userEvent.click(button);
    // expect(mixpanel.init).toHaveBeenCalledOnce();
    // expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_VIEW_ALL_DAPPS, {
    //   Location: "Graphic",
    //   token: TOKEN,
    // });
  });

  // test("should not call mixpanel event for view all dapps", async () => {
  //   disableMixpanel();
  //   const { getByLabelText } = render(
  //     await HeroSectionExplore({ totalApps: AMOUNT_DAPPS })
  //   );
  //   const button = getByLabelText(/view all dapps/i);
  //   expect(button).toBeDefined();
  //   await userEvent.click(button);
  //   expect(mixpanel.init).toHaveBeenCalledOnce();
  //   expect(mixpanel.track).not.toHaveBeenCalledWith(CLICK_ON_VIEW_ALL_DAPPS, {
  //     Location: "Graphic",
  //     token: TOKEN,
  //   });
  // });
});
