// import download from "download";
// import path from "path";
// import { stat } from "fs/promises";
// import { test as base, chromium, type BrowserContext } from "@playwright/test";
// import { tmpdir } from "os";

// const downloadRelease = async (tag: `v${number}.${number}.${number}`) => {
//   const zipUrl = `https://github.com/chainapsis/keplr-wallet/releases/download/${tag}/keplr-extension-manifest-v3-${tag}.zip`;
//   const zipPath = path.join(tmpdir(), `./.temp/keplrs-${tag}`);
//   try {
//     await stat(zipPath);
//   } catch (e) {
//     await download(zipUrl, zipPath, { extract: true });
//   }
//   return zipPath;
// };

// export type KeplrFixture = {
//   context: BrowserContext;
//   extensionId: string;
// };

// export const test = base.extend<KeplrFixture>({
//   context: async ({}, use) => {
//     const pathToExtension = await downloadRelease("v0.12.26");

//     const context = await chromium.launchPersistentContext("", {
//       headless: false,
//       args: [
//         `--disable-extensions-except=${pathToExtension}`,
//         `--load-extension=${pathToExtension}`,
//       ],
//     });

//     await use(context);

//     await context.close();
//   },
//   extensionId: async ({ context }, use) => {
//     let [background] = context.serviceWorkers();
//     if (!background) background = await context.waitForEvent("serviceworker");

//     const extensionId = background.url().split("/")[2];

//     await use(extensionId);
//   },
// });

// export default test;
