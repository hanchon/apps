import { type BrowserContext } from "@playwright/test";
import { waitLocator } from "../wait-locator";

export class Keplr {
  constructor(
    private context: BrowserContext,
    private extensionId: string
  ) {}
  signin = async () => {
    const keplrExt = await this.context.newPage();

    await keplrExt.goto(`chrome-extension://${this.extensionId}/popup.html`);

    await waitLocator(keplrExt.locator('input[type="password"]')).fill(
      "12345678"
    );

    await waitLocator(
      keplrExt.getByRole("button", { name: "Unlock", exact: true })
    ).click();

    await keplrExt.getByText("Total Available").waitFor();
    await keplrExt.close();
  };
  setup = async () => {
    const keplrExt = await this.context.newPage();
    await keplrExt.goto(`chrome-extension://${this.extensionId}/register.html`);
    try {
      await keplrExt.waitForEvent("close", {
        timeout: 1000,
      });
    } catch (e) {}
    if (keplrExt.isClosed()) {
      await this.signin();
      return;
    }

    await waitLocator(
      keplrExt.getByRole("button", { name: "Import an existing wallet" })
    ).click();

    await waitLocator(
      keplrExt.getByRole("button", {
        name: "Use recovery phrase or private key",
      })
    ).click();
    const seedPhrase = process.env.E2E_TEST_SEED;
    if (!seedPhrase) {
      throw new Error("E2E_TEST_SEED env variable is not defined");
    }

    const words = seedPhrase.split(" ");
    await keplrExt.waitForTimeout(1000);

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const inputLocator = keplrExt.locator(`input`).nth(i);
      await inputLocator.waitFor();
      await inputLocator.focus();
      await inputLocator.fill(word, { force: true });
    }

    await waitLocator(
      keplrExt.getByRole("button", { name: "Import", exact: true })
    ).click();

    await waitLocator(keplrExt.locator('input[name="name"]')).fill("test");

    await waitLocator(keplrExt.locator('input[name="password"]')).fill(
      "12345678"
    );

    await waitLocator(keplrExt.locator('input[name="confirmPassword"]')).fill(
      "12345678"
    );

    await waitLocator(
      keplrExt.getByRole("button", { name: "Next", exact: true })
    ).click();

    await waitLocator(
      keplrExt.getByRole("button", { name: "Save", exact: true })
    ).click();

    await keplrExt.close();
  };

  approve = async (
    options: {
      timeout?: number;
    } = {}
  ) => {
    try {
      const extensionPage = await this.context.waitForEvent("page", options);

      await waitLocator(
        extensionPage.getByRole("button", {
          name: "Approve",
          disabled: false,
          exact: true,
        })
      ).click();
    } catch (e) {}
  };
}
