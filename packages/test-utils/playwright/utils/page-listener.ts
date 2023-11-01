import { BrowserContext, Page } from "@playwright/test";

export const pageListener = (context: BrowserContext) => {
  const promise = context.waitForEvent("page");
  let page: Page | null = null;

  void promise.then((p) => {
    page = p;
  });
  return {
    load: promise,
    get page() {
      if (!page) throw new Error("Page not loaded");
      return page;
    },
  };
};
