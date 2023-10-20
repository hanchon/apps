import { test } from "@playwright/test";
const { describe, beforeEach, expect } = test;
describe("Mission Page - Copilot", () => {
  beforeEach(async ({ page }) => {
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
  test("install Metamask", async ({ page }) => {
    await page.getByRole("button", { name: /Connect/i }).click();
    await page
      .getByRole("button", {
        name: /Evmos Copilot Recommended for first time users New/i,
      })
      .click();

    await page
      .getByRole("button", {
        name: /Install MetaMask/i,
      })
      .click();

    await expect(page.getByText(/Waiting for Metamask Setup/i)).toBeVisible();
  });
});
