import { pageListener } from "@evmosapps/test-utils";
import { BrowserContext } from "playwright";

export const cleanupTabs = async (context: BrowserContext) => {
  const pages = context.pages();
  for (const page of pages) {
    if (page.url().startsWith("chrome-extension://")) {
      await page.close();
    }
  }
};
export const getMMPopup = async (context: BrowserContext) => {
  const pages = context.pages();
  return (
    pages.find((page) => page.url().startsWith("chrome-extension://")) ||
    (await context.waitForEvent("page"))
  );
};
export const connectSwitchAndSignPubkey = async (
  context: BrowserContext,
  trigger: () => Promise<void>
) => {
  const approveAllPopup = pageListener(context);

  await trigger();
  await approveAllPopup.load;
  let popupPage = approveAllPopup.page;

  await popupPage.getByRole("button", { name: /Next/i }).click();
  await popupPage.getByRole("button", { name: /Connect/i }).click();

  if (popupPage.isClosed()) {
    popupPage = await getMMPopup(context);
  }

  await popupPage.getByRole("button", { name: /Sign/i }).click();
};
