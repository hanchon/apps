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

test.skip("Mission Page - Copilot", () => {
  web3Test(
    "should let the user connect with MetaMask",
    async ({ page, wallet }) => {
      await expect(
        page.getByText(/Onboard to Evmos in 5 minutes/i)
      ).toBeVisible();

      await expect(page.getByText(/Let's go/i)).toBeVisible();
      await expect(
        page.locator("div").filter({ hasText: /^- Evmos$/ })
      ).toBeVisible();

      await expect(page.locator("p").filter({ hasText: "$ -" })).toBeVisible();

      await expect(
        page
          .locator("div")
          .filter({ hasText: /^Available Balance- EVMOS\$ -$/ })
      ).toBeVisible();

      await expect(
        page.locator("div").filter({ hasText: /^Staked Balance- EVMOS\$ -$/ })
      ).toBeVisible();

      await expect(
        page
          .locator("div")
          .filter({ hasText: /^Claimeable Rewards- EVMOS\$ -$/ })
      ).toBeVisible();

      await page
        .getByRole("button", {
          name: /Claim Rewards/i,
        })
        .isDisabled();

      await page.getByRole("button", { name: /Connect/i }).click();
      await page.getByRole("button", { name: /MetaMask/i }).click();
      await wallet.approve();
      await expect(page.getByText(/Connected with Metamask/i)).toBeVisible();

      //   await page.pause();
      // this one is not working
      await expect(
        page.locator("div").filter({ hasText: /^0.01 Evmos$/ })
      ).toBeVisible();

      await expect(
        page.locator("p").filter({ hasText: /^$ 0.00$/ })
      ).toBeVisible();

      await expect(page.getByRole("button", { name: /Stake/i })).toBeVisible();

      await expect(
        page.getByRole("button", { name: /use a dApp/i })
      ).toBeVisible();

      //   diferenciar del otro top up
      await expect(
        page.getByRole("button", {
          name: /Top Up Account/i,
        })
      ).toBeVisible();

      //   clickearlo y ver que aparezca el modal correspondiente
    }
  );
});
