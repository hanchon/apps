import { inspect } from "util";
import { z } from "zod";
import { categorySchema } from "./schemas/entities/categorySchema";
import { dappSchema } from "./schemas/entities/dappSchema";
import { Log } from "helpers";
import { notion } from "./notion";

const categoriesDbId = "1bb5db7703bf4ba9bf11fc845433bdc4";
const dappsDbId = "f6c8a6f4b169463fa338c18917bf3af9";

export const fetchDapps = async () => {
  const dapps = await notion.databases.query({
    database_id: dappsDbId,
  });
  const dappsMap = new Map<string, z.output<typeof dappSchema>>();
  for (const result of await Promise.all(
    dapps.results.map((value) => dappSchema.safeParseAsync(value))
  )) {
    if (!result.success) {
      Log.error(`Error parsing dapp: ${result.error}`);
      continue;
    }

    const parsed = result.data;
    parsed.localized = Object.fromEntries(
      parsed.subItemNotionIds.map((notionId) => {
        const subItem = dappsMap.get(notionId);
        dappsMap.delete(notionId);
        if (!subItem) {
          throw new Error("Sub-item not found");
        }
        return [
          subItem?.name,
          {
            name: subItem?.displayName,
            description: subItem?.description,
          },
        ];
      })
    );
    dappsMap.set(parsed.notionId, parsed);
  }
  return dappsMap;
};
export const fetchCategories = async () => {
  const categories = await notion.databases.query({
    database_id: categoriesDbId,
  });

  return categories.results.reduce<
    Map<string, z.output<typeof categorySchema>>
  >((acc, category) => {
    const parsed = categorySchema.safeParse(category);

    if (parsed.success) {
      parsed.data.localized = Object.fromEntries(
        parsed.data.subItemNotionIds.map((notionId) => {
          const subItem = acc.get(notionId);
          acc.delete(notionId);
          if (!subItem) {
            throw new Error("Sub-item not found");
          }
          return [
            subItem?.name,
            {
              name: subItem?.displayName,
              description: subItem?.description,
            },
          ];
        })
      );
      acc.set(parsed.data.notionId, parsed.data);

      return acc;
    }

    return acc;
  }, new Map());
};
