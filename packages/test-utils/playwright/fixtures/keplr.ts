import { test as base, chromium, type BrowserContext } from "@playwright/test";
import { Keplr } from "../utils/keplr/keplr-controller";
import { downloadRelease } from "../utils/keplr/download-release";
import { tmpdir } from "os";
import path from "path";

const makeKeplr = async (context: BrowserContext, extensionId: string) => {
  const keplr = new Keplr(context, extensionId);

  await keplr.setup();
  return keplr;
};

const loadContext = async () => {
  const pathToExtension = await downloadRelease("v0.12.26");

  const context = await chromium.launchPersistentContext(
    path.join(tmpdir(), "keplrcontext"),
    {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    }
  );
  return context;
};

const test = base.extend<{
  context: BrowserContext;
  keplr: Keplr;
}>({
  context: async ({}, use) => {
    const context = await loadContext();

    await use(context);
    await context.close();
  },

  keplr: async ({ context }, use) => {
    let [background] = context.serviceWorkers();
    if (!background) background = await context.waitForEvent("serviceworker");

    const extensionId = background.url().split("/")[2];
    const keplr = await makeKeplr(context, extensionId);
    await use(keplr);
  },
});

const fixture = {
  test,
  ...test,
};

export default fixture;
