import { BrowserContext } from "playwright";
import { waitLocator } from "../wait-locator";
import { mnemonicToAccount } from "viem/accounts";
import { toHex } from "viem";

export const setupKeplr = async (context: BrowserContext) => {
  const keplrExt = await context.waitForEvent("page");

  await waitLocator(
    keplrExt.getByRole("button", { name: "Import an existing wallet" })
  ).click();

  await waitLocator(
    keplrExt.getByRole("button", { name: "Use recovery phrase or private key" })
  ).click();

  const { getHdKey } = mnemonicToAccount(
    process.env.E2E_TEST_SEED ??
      "test test test test test test test test test test test junk"
  );
  const privateKey = toHex(getHdKey().privateKey ?? "");

  await waitLocator(
    keplrExt.getByRole("button", { name: "Private key", exact: true })
  ).click();

  await waitLocator(keplrExt.locator('input[type="password"]').nth(0)).fill(
    privateKey
  );

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
