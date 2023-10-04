import { Page } from "playwright";
import { Keplr } from "../../fixtures/keplr-controller";
import { waitLocator } from "../wait-locator";

export const connectToKeplr = async (page: Page, keplr: Keplr) => {
  const keplrButton = page.getByTestId(/wallet-profile-button-keplr/);
  if (
    await keplrButton.isVisible({
      timeout: 1000,
    })
  ) {
    return;
  }
  await waitLocator(page.getByTestId("open-connect-modal")).click();

  await waitLocator(page.getByTestId("connect-with-keplr")).click();

  await keplr.approve();

  await page.getByTestId(/wallet-profile-button/).waitFor();
};
