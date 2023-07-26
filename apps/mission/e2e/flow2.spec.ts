import { test, expect } from "@playwright/test";
import {
  web3Test,
  web3TestWithoutNetwork,
} from "playwright-config-custom/helpers";

const BALANCE_ENDPOINT =
  "*/**/BalanceByDenom/EVMOS/evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g/aevmos";

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

test.skip("Mission page", () => {
  web3Test(
    "should let the user connect with MetaMask, set the accounts, top up the account and redirect to the ecosystem page. Network is already set up",
    async ({ page, wallet }) => {
      await page.getByRole("button", { name: /Copilot/i }).click();

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
      await page.route(`${BALANCE_ENDPOINT}`, async (route) => {
        const json = {
          balance: {
            denom: "aevmos",
            amount: "0",
          },
        };
        await route.fulfill({ json });
      });

      await page.getByRole("button", { name: "Debit/Credit card" }).click();
      await page.getByRole("button", { name: /Next steps/i }).isHidden();
      await page.waitForTimeout(3000);
      await page.route(`${BALANCE_ENDPOINT}`, async (route) => {
        const json = {
          balance: {
            denom: "aevmos",
            amount: "100",
          },
        };
        await route.fulfill({ json });
      });

      await page.getByRole("button", { name: /Next steps/i }).click();

      await page
        .getByRole("button", { name: "Interact with a dApp Recommended" })
        .click();

      // Wait for the redirect to happen
      // await page.waitForURL("https://evmos.org/ecosystem");

      // // Assert that the URL has changed to the target page URL
      // const currentUrl = page.url();
      // expect(currentUrl).toBe("https://evmos.org/ecosystem");

      // await page.close();
    }
  );
});
