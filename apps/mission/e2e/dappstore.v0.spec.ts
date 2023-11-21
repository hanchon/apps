// import { mmFixture } from "@evmosapps/test-utils";

// const { test, expect, describe } = mmFixture;
import { expect, test } from "@playwright/test";

test("a", async ({ page }) => {
  await page.goto("http://localhost:3004");

  //   await expect(
  //     page.getByRole("heading", { name: /Add your dApp to the dApp Store/i })
  //   ).toBeVisible();

  //   await expect(
  //     page.getByRole("link", { name: /Add your dApp/i })
  //   ).toBeVisible();

  //   const page1Promise = page.waitForEvent("popup");
  //   await page.getByRole("link", { name: "Add your dApp" }).click();
  //   const page1 = await page1Promise;

  //   //   on tally
  //   await expect(
  //     page1.getByRole("heading", {
  //       name: /Here you can add your dApp to our Evmos dApp Store./i,
  //     })
  //   ).toBeVisible();

  //   await page1.close();

  //   await expect(
  //     page.getByRole("link", { name: /Learn to build on Evmos/i })
  //   ).toBeVisible();

  //   const page2Promise = page.waitForEvent("popup");
  //   await page.getByRole("link", { name: "Learn to build on Evmos" }).click();
  //   const page2 = await page2Promise;

  //   //   on tally
  //   await expect(
  //     page2.getByRole("heading", {
  //       name: /Getting Started/i,
  //     })
  //   ).toBeVisible();

  //   await page2.close();

  await expect(
    page.getByRole("heading", { name: /Instant dApps/i })
  ).toBeVisible();

  await page.getByRole("link", { name: "See More" }).click();
  await expect(page).toHaveURL("http://localhost:3004/dapps");
  await page.getByLabel("home").click();
  await expect(page).toHaveURL("http://localhost:3004");

  await page.getByRole("link", { name: /See all/i }).click();
  await expect(page).toHaveURL("http://localhost:3004/dapps");
  await page.getByLabel("home").click();
  await expect(page).toHaveURL("http://localhost:3004");

  await page.pause();
  await page
    .getByRole("link", {
      name: /c14/i,
    })
    .click();
  await expect(
    page.getByRole("heading", { name: /How to use c14 Instant dApp/i })
  ).toBeVisible();

  const c14Widget = page.getByTestId("c14-widget");
  await c14Widget.waitFor();

  expect(await c14Widget.count()).toBe(1);
});
