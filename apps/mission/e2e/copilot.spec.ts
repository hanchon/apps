import { mmFixture } from "@evmosapps/test-utils";
import { BALANCE_ENDPOINT } from "./constants";

const { test, beforeEach, describe, expect } = mmFixture;

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

  test("should let the user connect with MetaMask, set the accounts, top up the account and redirect to the ecosystem page. Network is already set up", async ({
    page,
  }) => {
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

    await expect(page.getByText(/Press Next and Connect/i)).toBeVisible();
    const approveAllPopup = await page.context().waitForEvent("page");

    await approveAllPopup.getByRole("button", { name: /Next/i }).click();
    await approveAllPopup.getByRole("button", { name: /Connect/i }).click();
    await approveAllPopup.getByRole("button", { name: /Sign/i }).click();

    await page.getByRole("button", { name: /Top up your account/i }).click();
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

    const c14Widget = page.getByTestId("c14-widget");
    await c14Widget.waitFor();

    expect(await c14Widget.count()).toBe(1);

    await page.getByTestId("card-provider-dropdown").click();
    await page.getByRole("button", { name: /Transak/i }).click();

    const transakWidget = page.getByTestId("transak-widget");
    await transakWidget.waitFor();

    expect(await transakWidget.count()).toBe(1);

    await page.getByRole("button", { name: "Cryptocurrencies" }).click();

    const squidDWidget = page.getByTestId("squid-widget");
    await squidDWidget.waitFor();

    expect(await squidDWidget.count()).toBe(1);

    await page.getByTestId("card-provider-dropdown").click();
    await page.getByRole("button", { name: /LayerSwap/i }).click();

    const lawerSwapWidget = page.getByTestId("layerswap-widget");
    await lawerSwapWidget.waitFor();

    expect(await lawerSwapWidget.count()).toBe(1);

    await page.getByTestId("card-provider-dropdown").click();
    await page.getByRole("button", { name: /Cypher Wallet/i }).click();

    const cypherDWidget = page.getByTestId("cypher-onboading-sdk");
    await cypherDWidget.waitFor();

    expect(await cypherDWidget.count()).toBe(1);

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

    await page.waitForTimeout(3000);

    await page.getByRole("button", { name: /Next steps/i }).click();

    await page
      .getByRole("button", { name: "Interact with a dApp Recommended" })
      .click();
  });
});
