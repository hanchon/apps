import "server-only";
import { Client } from "@notionhq/client";

import { cachedFetch } from "../cached-fetch";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  fetch: cachedFetch,
});
