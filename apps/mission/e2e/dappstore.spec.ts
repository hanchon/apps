import { test, expect } from "@playwright/test";
import { web3Test } from "playwright-config-custom/helpers";

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
  web3Test(
    "should let the user connect with MetaMask",
    async ({ page, wallet }) => {
      await expect(
        page.getByText(/Onboard to Evmos in 5 minutes/i)
      ).toBeVisible();

      // as we are not connected it should display let's go and all they balances with -
      await expect(page.getByText(/Let's go/i)).toBeVisible();

      // total balance
      await expect(
        page.locator("div").filter({ hasText: /^- Evmos$/ })
      ).toBeVisible();
      await expect(page.locator("p").filter({ hasText: "$ -" })).toBeVisible();

      // staking - available balance
      await expect(
        page
          .locator("div")
          .filter({ hasText: /^Available Balance- EVMOS\$ -$/ })
          .locator("h5")
      ).toBeVisible();

      // staking - staked balance
      await expect(
        page
          .locator("div")
          .filter({ hasText: /^Staked Balance- EVMOS\$ -$/ })
          .locator("h5")
      ).toBeVisible();

      // staking - claimable rewards
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

      // balance is 0 so we can show top up account button on the onboarding section
      //  I need to merge the two PRs to get the right call and mock it
      await page.waitForTimeout(3000);

      // connect with metamask
      await page.getByRole("button", { name: /Connect/i }).click();
      await page.getByRole("button", { name: /MetaMask/i }).click();
      await wallet.approve();
      await expect(page.getByText(/Connected with Metamask/i)).toBeVisible();

      // await page.pause();

      // await expect(
      //   page.getByRole("heading", { name: "0.00Evmos" })
      // ).toBeVisible();

      // update balance to have some
      await page.route(`${BALANCE_ENDPOINT}`, async (route) => {
        const json = {
          balance: {
            denom: "aevmos",
            amount: "13234",
          },
        };
        await route.fulfill({ json });
      });

      await page.waitForTimeout(3000);

      await expect(
        page.getByRole("heading", { name: "0.01Evmos" })
      ).toBeVisible();

      // total balance in dollars
      await expect(
        page.locator("p").filter({ hasText: "$ 0.00" })
      ).toBeVisible();

      // staking - available balance
      await expect(
        page
          .locator("div")
          .filter({ hasText: /^Available Balance0\.00 EVMOS\$ 0\.00$/ })
          .locator("h5")
      ).toBeVisible();

      // staking - staked balance
      await expect(
        page
          .locator("div")
          .filter({ hasText: /^Staked Balance0\.00 EVMOS\$ 0\.00$/ })
          .locator("h5")
      ).toBeVisible();

      // staking - claimable rewards
      await expect(
        page
          .locator("div")
          .filter({ hasText: /^Claimeable Rewards0\.01 EVMOS\$ 0\.00$/ })
          .locator("h5")
      ).toBeVisible();
      await page
        .getByRole("button", {
          name: /Claim Rewards/i,
        })
        .isEnabled();

      await expect(
        page.getByRole("button", { name: "Stake", exact: true })
      ).toBeVisible();

      await expect(
        page.getByRole("button", { name: /use a dApp/i })
      ).toBeVisible();

      //   diferenciar del otro top up
      await page
        .getByRole("button", {
          name: "Top Up Account",
          exact: true,
        })
        .click();

      await expect(
        page.getByRole("heading", { name: "Evmos Copilot" })
      ).toBeVisible();

      await page.getByRole("button", { name: "Close" }).click();
      await page.getByRole("button", { name: "Exit" }).click();

      //   clickearlo y ver que aparezca el modal correspondiente
    }
  );
});
