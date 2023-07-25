import { test, expect } from "@playwright/test";
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
      await page.getByRole("button", { name: /Copilot/i }).click();

      //

      await page
        .getByRole("button", {
          name: /Connect with MetaMask/i,
        })
        .click();

      await page
        .getByRole("button", { name: /Press Next and Connect/i })
        .isVisible();

      await wallet.approve();

      await page.getByRole("button", { name: /Top up your account/i }).click();
      await page.route(
        "*/**/BalanceByDenom/EVMOS/evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g/aevmos",
        async (route) => {
          const json = {
            balance: {
              denom: "aevmos",
              amount: "0",
            },
          };
          await route.fulfill({ json });
        }
      );

      await page.getByRole("button", { name: "Debit/Credit card" }).click();
      await page.waitForTimeout(3000);
      await page.getByRole("button", { name: /Next steps/i }).isHidden();

      await page.route(
        "*/**/BalanceByDenom/EVMOS/evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g/aevmos",
        async (route) => {
          const json = {
            balance: {
              denom: "aevmos",
              amount: "100",
            },
          };
          await route.fulfill({ json });
        }
      );

      await page.getByRole("button", { name: /Next steps/i }).isVisible();
      await page.pause();
    }
  );
});
