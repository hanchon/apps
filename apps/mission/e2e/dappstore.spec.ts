import { test, expect } from "@playwright/test";
import { web3Test } from "playwright-config-custom/helpers";

const STAKING_INFO_ENDPOINT =
  "*/**/stakingInfo/evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g";

const ERC20_MODULE_BALANCE_ENDPOINT = `*/**/ERC20ModuleBalance/evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g/0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`;

const responseZeroBalance = {
  balance: [
    {
      name: "EVMOS",
      symbol: "EVMOS",
      decimals: 18,
      erc20Balance: "0",
      cosmosBalance: "0",
      tokenName: "EVMOS",
      tokenIdentifier: "EVMOS",
      description: "EVMOS",
      coingeckoPrice: "0.084586",
      chainId: "evmos_9001-2",
      chainIdentifier: "Evmos",
      handledByExternalUI: null,
      erc20Address: "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517",
      pngSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.png",
      prefix: "evmos",
    },
  ],
};

const responseERC20ModuleBalance = {
  balance: [
    {
      name: "EVMOS",
      symbol: "EVMOS",
      decimals: 18,
      erc20Balance: "92001000000000000",
      cosmosBalance: "6498549296417793206",
      tokenName: "EVMOS",
      tokenIdentifier: "EVMOS",
      description: "EVMOS",
      coingeckoPrice: "0.084586",
      chainId: "evmos_9001-2",
      chainIdentifier: "Evmos",
      handledByExternalUI: null,
      erc20Address: "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517",
      pngSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.png",
      prefix: "evmos",
    },
  ],
};

const responseInfoStaking = {
  delegations: [
    {
      delegation: {
        delegator_address: "evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g",
        validator_address:
          "evmosvaloper1mx9nqk5agvlsvt2yc8259nwztmxq7zjqep5khu",
        shares: "11111111110000000.000000000000000000",
        rank: 0,
        validator: {
          operator_address:
            "evmosvaloper1mx9nqk5agvlsvt2yc8259nwztmxq7zjqep5khu",
          consensus_pubkey: {
            type_url: "",
            value: "",
          },
          jailed: false,
          status: "BOND_STATUS_BONDED",
          tokens: "8606954651892010787306223",
          delegator_shares: "8606954651892010787306223.000000000000000000",
          description: {
            moniker: "OrbitalApes.com",
            identity: "0FC43339DE6CE5EE",
            website: "https://www.orbitalapes.com",
            security_contact: "",
            details: "Evmos Validator by Orbital Apes NFT",
          },
          unbonding_height: "0",
          unbonding_time: "1970-01-01T00:00:00Z",
          commission: {
            commission_rates: {
              rate: "0.050000000000000000",
              max_rate: "0.100000000000000000",
              max_change_rate: "0.010000000000000000",
            },
            update_time: "2022-04-28T21:50:32.806138839Z",
          },
          min_self_delegation: "1000000",
          rank: 5,
        },
      },
      balance: {
        denom: "aevmos",
        amount: "1",
      },
    },
  ],
  undelegations: [],
  rewards: {
    rewards: [
      {
        validator_address:
          "evmosvaloper1mx9nqk5agvlsvt2yc8259nwztmxq7zjqep5khu",
        reward: [
          {
            denom: "aevmos",
            amount: "5827134782040607.911000000000000000",
          },
        ],
      },
    ],
    total: [
      {
        denom: "aevmos",
        amount: "5827134782040607.911000000000000000",
      },
    ],
  },
};

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

      await page.route(`${STAKING_INFO_ENDPOINT}`, async (route) => {
        const json = responseInfoStaking;
        await route.fulfill({ json });
      });

      await page.route(ERC20_MODULE_BALANCE_ENDPOINT, async (route) => {
        const json = responseZeroBalance;
        await route.fulfill({ json });
      });

      // connect with metamask
      await page.getByRole("button", { name: /Connect/i }).click();
      await page.getByRole("button", { name: /MetaMask/i }).click();
      await wallet.approve();
      // await wallet.sign();

      await page.pause();

      // await expect(
      //   page.getByRole("heading", { name: "0.00Evmos" })
      // ).toBeVisible();

      // update balance to have some

      // await page.route(`${STAKING_INFO_ENDPOINT}`, async (route) => {
      //   const json = responseInfoStaking;
      //   await route.fulfill({ json });
      // });

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
