import { test } from "@playwright/test";
import { web3Test } from "playwright-config-custom/helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

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
});

test.describe("Mission page", () => {
  web3Test(
    "should let the user connect with MetaMask",
    async ({ page, wallet }) => {
      await page.pause();
      await page.getByRole("button", { name: "Copilot" }).click();
      await page.getByRole("button", { name: "Connect with MetaMask" }).click();
      await wallet.approve();
      await page.pause();
    }
  );
});
