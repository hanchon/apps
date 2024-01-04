import "server-only";
import { Client } from "@notionhq/client";
import { cache } from "react";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  fetch: cache(fetch),
});
