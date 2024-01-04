import { notion } from "helpers/src/clients/notion";
import { devModeCache } from "helpers/src/dev/dev-mode-cache";

export const retrievePage = devModeCache(
  async (pageId: string) =>
    await notion.pages.retrieve({
      page_id: pageId,
    }),
  {
    cacheKey: (pageId: string) => pageId,
  }
);
