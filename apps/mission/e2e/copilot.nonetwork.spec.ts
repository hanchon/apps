import { noNetworkMMFixture, waitLocator } from "@evmosapps/test-utils";
import { BALANCE_ENDPOINT } from "./constants";

const { test, beforeEach, describe, expect, step } = noNetworkMMFixture;

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

  test("should let the user connect with MetaMask, set the network, the accounts, top up the account and redirect to the ecosystem page", async ({
    page,
  }) => {
    await step("Reject Connect", async () => {
      await page.getByRole("button", { name: /Connect/i }).click();

      await page
        .getByRole("button", {
          name: /Evmos Copilot Recommended for first time users New/i,
        })
        .click();

      await page
        .getByRole("button", {
          name: /Connect with MetaMask/i,
        })
        .click();
      const switchNetworkPopup = await page.context().waitForEvent("page");

      await expect(page.getByText(/Approve on MetaMask/i)).toBeVisible();

      await switchNetworkPopup.getByRole("button", { name: /Cancel/i }).click();

      await expect(
        page.getByText(/Approval Rejected, please try again/i)
      ).toBeVisible();
    });

    await step("Reject switch network", async () => {
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

      await expect(
        page.getByText(
          /You need to switch the network to Evmos, please try again/i
        )
      ).toBeVisible();
    });

    await step("Reject get accounts", async () => {
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

      await expect(page.getByText(/Press Next and Connect/i)).toBeVisible();

      const getAccountsPopup = await page.context().waitForEvent("page");
      await getAccountsPopup.getByRole("button", { name: /Cancel/i }).click();

      await expect(
        page.getByText(/Get accounts rejected, please try again/i)
      ).toBeVisible();
    });

    await step("Approve Pubkey", async () => {
      await page
        .getByRole("button", {
          name: /Try again/i,
        })
        .click();

      const approveAllPopup = await page.context().waitForEvent("page");

      await approveAllPopup.getByRole("button", { name: /Next/i }).click();
      await approveAllPopup.getByRole("button", { name: /Connect/i }).click();
      await approveAllPopup.getByRole("button", { name: /Sign/i }).click();
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
