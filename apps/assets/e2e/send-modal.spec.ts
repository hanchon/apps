import { Page } from "playwright";
import keplrTest from "playwright-config-custom/fixtures/keplr";
import {
  acceptTOS,
  connectToKeplr,
  waitLocator,
} from "playwright-config-custom/utils";

const fillAmount = async (page: Page, amount = "0.000000000000000001") => {
  await keplrTest.step("Fill amount", async () => {
    const amountInput = await waitLocator(
      page.getByTestId("asset-selector-amount-input")
    ).focus();

    await amountInput.fill(amount, {
      force: true,
    });
  });
};

const fillAddress = async (
  page: Page,
  // eslint-disable-next-line no-secrets/no-secrets
  address = "evmos1gxykhk5uffcrc7mqppftfrcxumqm6gz0lh8t5k"
) => {
  await keplrTest.step("Fill receiver address", async () => {
    await waitLocator(page.getByTestId("account-selector-input")).fill(address);
  });
};

const send = async (page: Page) => {
  await keplrTest.step("Click on send button", async () => {
    await waitLocator(page.getByTestId("transfer-send-button")).click();
  });
};

const expectSuccessScreen = async (page: Page) => {
  await keplrTest.step("should show success screen", async () => {
    await keplrTest
      .expect(page.getByTestId("tx-receipt-success-message"))
      .toBeVisible({
        timeout: 1000 * 120,
      });
  });
};

const selectToken = async (page: Page, denom: string) => {
  await keplrTest.step("Select token", async () => {
    await waitLocator(
      page.getByTestId("asset-selector-token-selector-button")
    ).click();

    await waitLocator(
      page.getByTestId(`asset-selector-token-selector-option-${denom}`)
    ).click();
  });
};

const selectDestinationNetwork = async (page: Page, network: string) => {
  await keplrTest.step("Select destination network", async () => {
    await waitLocator(
      page.getByTestId("account-selector-network-selector-button")
    ).click();

    await waitLocator(
      page.getByTestId(`account-selector-network-selector-option-${network}`)
    ).click();
  });
};

const selectNetwork = async (page: Page, network: string) => {
  await keplrTest.step("Select network", async () => {
    await waitLocator(
      page.getByTestId("asset-selector-network-selector-button")
    ).click();

    await waitLocator(
      page.getByTestId(`asset-selector-network-selector-option-${network}`)
    ).click();
  });
};
const waitForBalanceToLoad = async (page: Page) => {
  await page.getByTestId("asset-selector-balance-display").waitFor();

  await page.waitForTimeout(200);
};

keplrTest.describe("Send Modal", () => {
  keplrTest.beforeEach(async ({ page, keplr }) => {
    await keplrTest.step("Go to assets page", async () => {
      await page.goto("/assets");
    });
    await keplrTest.step("Accept TOS", async () => {
      await acceptTOS(page);
    });

    await keplrTest.step("Connect to Keplr", async () => {
      await connectToKeplr(page, keplr);
    });

    await keplrTest.step(
      "Open Send Modal and wait account to load",
      async () => {
        await waitLocator(page.getByTestId("open-send-modal-button")).click();

        await page.getByTestId("asset-selector-balance-display").waitFor();
      }
    );
  });

  keplrTest(
    "should be able to send evmos2evmos transaction",
    async ({ keplr, page }) => {
      await waitForBalanceToLoad(page);
      await fillAddress(page);
      await fillAmount(page);
      await send(page);
      await keplr.approve();
      await expectSuccessScreen(page);
    }
  );

  keplrTest(
    "should be able to send evmos2evmos ERC-20 transaction",
    async ({ keplr, page }) => {
      await selectToken(page, "NEOK");
      await waitForBalanceToLoad(page);

      await fillAddress(page);
      await fillAmount(page);

      await send(page);
      await keplr.approve();
      await expectSuccessScreen(page);
    }
  );

  keplrTest(
    "should be able to send cosmos2evmos transaction",
    async ({ keplr, page }) => {
      await selectToken(page, "OSMO");
      await selectNetwork(page, "osmosis");
      await keplr.approve({
        timeout: 1000,
      });
      await waitForBalanceToLoad(page);

      await fillAmount(page, "0.000001");
      await send(page);

      await keplr.approve();
      await expectSuccessScreen(page);
    }
  );

  keplrTest(
    "should be able to send evmos2cosmo transaction",
    async ({ keplr, page }) => {
      await selectDestinationNetwork(page, "osmosis");
      await keplr.approve({
        timeout: 1000,
      });
      await waitForBalanceToLoad(page);
      await fillAmount(page);
      await send(page);
      await keplr.approve();
      await expectSuccessScreen(page);
    }
  );
});
