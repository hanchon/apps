import { noNetworkMMFixture, waitLocator } from "@evmosapps/test-utils";
import { BALANCE_ENDPOINT } from "./constants";
import { pageListener } from "@evmosapps/test-utils";
import {
  cleanupTabs,
  connectSwitchAndSignPubkey,
  getMMPopup,
} from "./cleanupTabs";

const { test, beforeEach, describe, expect, step } = noNetworkMMFixture;

describe("Mission Page - Copilot", () => {
  beforeEach(async ({ page, context }) => {
    await cleanupTabs(context);
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

  test("should let the user connect with MetaMask, set the network, the accounts, top up the account and redirect to the ecosystem page", async ({
    page,
    context,
  }) => {
    await step("Reject Connect", async () => {
      await page.getByRole("button", { name: /Connect/i }).click();

      await page
        .getByRole("button", {
          name: /Evmos Copilot Recommended for first time users New/i,
        })
        .click();
      const switchNetworkPopup = pageListener(context);
      await page
        .getByRole("button", {
          name: /Connect with MetaMask/i,
        })
        .click();

      await switchNetworkPopup.load;

      await expect(page.getByText(/Approve on MetaMask/i)).toBeVisible();

      await switchNetworkPopup.page
        .getByRole("button", { name: /Cancel/i })
        .click();

      await expect(
        page.getByText(/Approval Rejected, please try again/i)
      ).toBeVisible();
    });

    await step("Reject switch network", async () => {
      const switchNetworkPopupRetry = pageListener(context);
      await page
        .getByRole("button", {
          name: /Try again/i,
        })
        .click();
      await switchNetworkPopupRetry.load;

      await switchNetworkPopupRetry.page
        .getByRole("button", { name: /Approve/i })
        .click();

      await switchNetworkPopupRetry.page
        .getByRole("heading", {
          name: "Allow this site to switch the network?",
        })
        .waitFor();
      await switchNetworkPopupRetry.page
        .getByRole("button", { name: /Cancel/i })
        .click();

      await expect(
        page.getByText(
          /You need to switch the network to Evmos, please try again/i
        )
      ).toBeVisible();
    });

    await step("Reject get accounts", async () => {
      const switchNetworkPopupRetryAfterApprove = pageListener(context);
      await page
        .getByRole("button", {
          name: /Try again/i,
        })
        .click();
      await switchNetworkPopupRetryAfterApprove.load;
      const popup = switchNetworkPopupRetryAfterApprove.page.isClosed()
        ? await getMMPopup(context)
        : switchNetworkPopupRetryAfterApprove.page;
      await popup.getByRole("button", { name: /Switch Network/i }).click();

      const getAccountsPopup = pageListener(context);

      await expect(page.getByText(/Press Next and Connect/i)).toBeVisible();

      await getAccountsPopup.load;

      await getAccountsPopup.page
        .getByRole("button", { name: /Cancel/i })
        .click();

      await expect(
        page.getByText(/Get accounts rejected, please try again/i)
      ).toBeVisible();
    });

    await step("Approve Pubkey", async () => {
      await connectSwitchAndSignPubkey(page.context(), () =>
        page.getByRole("button", { name: /Try again/i }).click()
      );
    });

    await step("Top up account", async () => {
      await waitLocator(
        page.getByRole("button", { name: /Top up your account/i })
      ).click();
      await page.route(`${BALANCE_ENDPOINT}`, async (route) => {
        const json = {
          balances: [
            {
              denom: "aevmos",
              amount: "0",
            },
          ],
          pagination: {
            next_key: null,
            total: "1",
          },
        };
        await route.fulfill({ json });
      });

      await page.waitForTimeout(3000);

      await page.getByRole("button", { name: "Debit/Credit card" }).click();
      await expect(
        page.getByRole("button", { name: /Next steps/i })
      ).toBeHidden();

      await page.route(`${BALANCE_ENDPOINT}`, async (route) => {
        const json = {
          balances: [
            {
              denom: "aevmos",
              amount: "100",
            },
          ],
          pagination: {
            next_key: null,
            total: "1",
          },
        };
        await route.fulfill({ json });
      });
    });

    await page.waitForTimeout(3000);

    await page.getByRole("button", { name: /Next steps/i }).click();

    await page
      .getByRole("button", { name: /Interact with a dApp Recommended/i })
      .click();
  });
});
