import { notion } from "helpers/src/clients/notion";

export const retrieveBlockList = async (blockId: string, cursor?: string) =>
  await notion.blocks.children.list({
    block_id: blockId,
    start_cursor: cursor,
  });
