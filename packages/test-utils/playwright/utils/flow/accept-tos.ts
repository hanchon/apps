import { Page } from "@playwright/test";

export const acceptTOS = async (page: Page) => {
  const { origins } = await page.context().storageState();
  const tosStorageKey = origins
    .find(({ origin }) => page.url().startsWith(origin))
    ?.localStorage.find(({ name }) => name === "evmos-TOS-v2");

  if (tosStorageKey) {
    return;
  }

  await page
    .locator("div")
    .filter({ hasText: /^I acknowledge to the Terms of Service\.$/ })
    .getByRole("checkbox")
    .check();
  await page
    .locator("div")
    .filter({
      hasText: /^I want to share usage data\. More information\.$/,
    })
    .getByRole("checkbox")
    .check();
  await page.getByRole("button", { name: "Accept", exact: true }).click();
  await page.getByRole("button", { name: /accept and proceed/i }).click();
};
