import { notion } from "helpers/src/clients/notion";

export const retrievePage = async (pageId: string) =>
  await notion.pages.retrieve({
    page_id: pageId,
  });
