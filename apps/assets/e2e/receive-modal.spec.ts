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
      page.getByTestId("request-asset-selector-amount-input")
    ).focus();

    await amountInput.fill(amount, {
      force: true,
    });
  });
};

const clickOnReceiveButton = async (page: Page) => {
  await keplrTest.step("Click on receive button", async () => {
    await waitLocator(page.getByTestId("receive-modal-receive-button")).click();
  });
};

const clickOnGenerateButton = async (page: Page) => {
  await keplrTest.step("Click on generate button", async () => {
    await waitLocator(
      page.getByTestId("receive-modal-generate-button")
    ).click();
  });
};

const setMessage = async (page: Page, message = "gimme money") => {
  await keplrTest.step("Set message", async () => {
    await waitLocator(page.getByTestId("receive-modal-message-input")).fill(
      message
    );
  });
};

const goToShareUrlFromInput = async (page: Page) => {
  const shareUrl = await waitLocator(
    page.getByTestId("request-modal-share-url-input")
  ).getAttribute("value");
  keplrTest.expect(shareUrl).toBeTruthy();
  const url = new URL(shareUrl!);
  await page.goto(url.toString().replace(url.origin, ""));
};

keplrTest.describe("Request Modal", () => {
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
        await waitLocator(
          page.getByTestId("open-request-modal-button")
        ).click();
      }
    );
  });

  keplrTest(
    "should be able to create an evmos2evmos request",
    async ({ page }) => {
      await clickOnReceiveButton(page);
      await fillAmount(page);
      await setMessage(page);
      await clickOnGenerateButton(page);
      await goToShareUrlFromInput(page);
    }
  );
});
