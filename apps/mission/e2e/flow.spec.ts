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

test.describe("Mission Page - Copilot", () => {
  test("install Metamask", async ({ page }) => {
    await page.getByRole("button", { name: /Copilot/i }).click();

    await page
      .getByRole("button", {
        name: /Install MetaMask/i,
      })
      .click();

    await page.getByText(/Waiting for Metamask Setup/i).isVisible();

    // how can I test that MM was installed ?
    // await page.waitForURL("https://metamask.io/download/");

    // // Assert that the URL has changed to the target page URL
    // const currentUrl = page.url();
  });

  web3TestWithoutNetwork(
    "should let the user connect with MetaMask, set the network, the accounts, top up the account and redirect to the ecosystem page",
    async ({ page, wallet }) => {
      await page.getByRole("button", { name: /Copilot/i }).click();

      await page
        .getByRole("button", {
          name: /Connect with MetaMask/i,
        })
        .click();

      await page
        .getByRole("button", { name: /Approve on MetaMask/i })
        .isVisible();

      const switchNetworkPopup = await page.context().waitForEvent("page");
      await switchNetworkPopup.getByRole("button", { name: /Cancel/i }).click();

      await page.getByText(/Approval Rejected, please try again/i).isVisible();
      await page
        .getByRole("button", {
          name: /Try again/i,
        })
        .click();
      const switchNetworkPopupRetry = await page.context().waitForEvent("page");
      await switchNetworkPopupRetry
        .getByRole("button", { name: /Approve/i })
        .click();

      await switchNetworkPopupRetry
        .getByRole("button", { name: /Cancel/i })
        .click();

      await page
        .getByText(/You need to switch the network to Evmos, please try again/i)
        .isVisible();

      await page
        .getByRole("button", {
          name: /Try again/i,
        })
        .click();

      const switchNetworkPopupRetryAfterApprove = await page
        .context()
        .waitForEvent("page");

      await switchNetworkPopupRetryAfterApprove
        .getByRole("button", { name: /Switch Network/i })
        .click();

      await page
        .getByRole("button", { name: /Press Next and Connect/i })
        .isVisible();

      const getAccountsPopup = await page.context().waitForEvent("page");
      await getAccountsPopup.getByRole("button", { name: /Cancel/i }).click();

      await page
        .getByText(/Get accounts rejected, please try again/i)
        .isVisible();

      await page
        .getByRole("button", {
          name: /Try again/i,
        })
        .click();

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
        .getByRole("button", { name: /Interact with a dApp Recommended/i })
        .click();
    }
  );
});
