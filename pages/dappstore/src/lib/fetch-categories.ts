import { z } from "zod";
import { categorySchema } from "./schemas/entities/categorySchema";

import { CATEGORIES_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import { Log } from "helpers";
import { notion } from "helpers/src/clients/notion";
import { cache } from "react";
import { devModeCache } from "helpers/src/dev/dev-mode-cache";

const fetchNotionCategories = devModeCache(
  cache(async () =>
    notion.databases.query({
      database_id: CATEGORIES_PAGE_NOTION_ID,
    })
  ),
  {
    cacheKey: "fetchNotionCategories",
  }
);
export const fetchCategories = async () => {
  const categories = await fetchNotionCategories();

  return categories.results.reduce<
    Map<string, z.output<typeof categorySchema>>
  >((acc, category) => {
    const parsed = categorySchema.safeParse(category);

    if (!parsed.success) {
      Log("notion").error(parsed.error.issues);
      return acc;
    }

    parsed.data.localized = Object.fromEntries(
      parsed.data.subItem.map((notionId) => {
        const subItem = acc.get(notionId);
        acc.delete(notionId);
        if (!subItem || !subItem?.language) {
          throw new Error("Sub-item not found");
        }
        return [
          subItem.language,
          {
            name: subItem.name,
            description: subItem?.description,
          },
        ];
      })
    );
    acc.set(parsed.data.notionId, parsed.data);

    return acc;
  }, new Map());
};
