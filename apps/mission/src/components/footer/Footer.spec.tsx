import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import { CLICK_ON_FOOTER_CTA, disableMixpanel } from "tracker";
import { Footer } from "./Footer";
// same as vitest.setup.ts
const TOKEN = "testToken";
describe("Testing Footer", () => {
  test("should call mixpanel event for build with evmos - Footer", async () => {
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/build with evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Build with evmos",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for build with evmos - Footer", async () => {
    disableMixpanel();
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/build with evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Build with evmos",
      token: TOKEN,
    });
  });

  test("should call mixpanel event for Github - Footer", async () => {
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/github evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Github",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for Github - Footer", async () => {
    disableMixpanel();
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/github evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Github",
      token: TOKEN,
    });
  });

  test("should call mixpanel event for Twitter - Footer", async () => {
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/Twitter evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "X",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for Twitter - Footer", async () => {
    disableMixpanel();
    const { getByLabelText } = render(await Footer());
    const buildButton = getByLabelText(/Twitter evmos/i);
    expect(buildButton).toBeDefined();
    await userEvent.click(buildButton);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "X",
      token: TOKEN,
    });
  });

  test("should call mixpanel event for Discord - Footer", async () => {
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/Discord evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Discord",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for Discord - Footer", async () => {
    disableMixpanel();
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/Discord evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Discord",
      token: TOKEN,
    });
  });

  test("should call mixpanel event for Telegram - Footer", async () => {
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/Telegram evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Telegram",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for Telegram - Footer", async () => {
    disableMixpanel();
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/Telegram evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Telegram",
      token: TOKEN,
    });
  });

  test("should call mixpanel event for Medium - Footer", async () => {
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/Medium evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Medium",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for Medium - Footer", async () => {
    disableMixpanel();
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/Medium evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Medium",
      token: TOKEN,
    });
  });

  test("should call mixpanel event for Commonwealth - Footer", async () => {
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/Commonwealth evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Commonwealth",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for Commonwealth - Footer", async () => {
    disableMixpanel();
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/Commonwealth evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Commonwealth",
      token: TOKEN,
    });
  });

  test("should call mixpanel event for Terms of Service - Footer", async () => {
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/Terms of Services/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Terms of service",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for Terms of Service - Footer", async () => {
    disableMixpanel();
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/Terms of Services/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Terms of service",
      token: TOKEN,
    });
  });

  test("should call mixpanel event for Privacy Policy - Footer", async () => {
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/Privacy Policy/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Privacy Statement",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for Privacy Policy - Footer", async () => {
    disableMixpanel();
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/Privacy Policy/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Privacy Statement",
      token: TOKEN,
    });
  });

  test("should call mixpanel event for Cookies Settings - Footer", async () => {
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/Cookies Settings/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Cookie Statement",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for Cookies Settings - Footer", async () => {
    disableMixpanel();
    const { getByLabelText } = render(await Footer());
    const button = getByLabelText(/Cookies Settings/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Cookie Statement",
      token: TOKEN,
    });
  });
});
