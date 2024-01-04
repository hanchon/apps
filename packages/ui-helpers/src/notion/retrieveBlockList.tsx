import { notion } from "helpers/src/clients/notion";
import { devModeCache } from "helpers/src/dev/dev-mode-cache";
import { cache } from "react";

export const retrieveBlockList = devModeCache(
  cache(
    async (blockId: string, cursor?: string) =>
      await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
      })
  ),
  {
    cacheKey: (blockId: string, cursor?: string) =>
      `${blockId}-${cursor ?? "initial"}`,
  }
);
