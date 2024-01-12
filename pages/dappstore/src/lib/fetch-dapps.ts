import { dappSchema } from "./schemas/entities/dappSchema";
import { inspect } from "util";
import { ECOSYSTEM_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import { Log } from "helpers";
import { notion } from "helpers/src/clients/notion";
import { cache } from "react";

const fetchNotionEcosystemDb = async () =>
  notion.databases.query({
    database_id: ECOSYSTEM_PAGE_NOTION_ID,
  });

export const fetchDapps = cache(async () => {
  const dapps = await fetchNotionEcosystemDb();

  const parsedDapps = await Promise.all(
    dapps.results.map(async (value) => {
      const result = await dappSchema.safeParseAsync(value);
      if (!result.success) {
        Log("notion").error(
          result.error.issues,
          inspect(value, true, 10, true)
        );
      }
      return result;
    })
  ).then((results) =>
    results.flatMap((result) => {
      if (!result.success || result.data.listed === false) {
        return [];
      }
      return [result.data];
    })
  );

  const dappsMap = new Map<string, (typeof parsedDapps)[number]>();

  for (const parsed of parsedDapps) {
    parsed.localized = Object.fromEntries(
      parsed.subItem.map((notionId) => {
        const subItem = dappsMap.get(notionId);
        dappsMap.delete(notionId);
        if (!subItem || !subItem.language) {
          throw new Error("Sub-item not found");
        }
        return [
          subItem?.language,
          {
            name: subItem?.name,
            description: subItem?.description,
          },
        ];
      })
    );
    dappsMap.set(parsed.notionId, parsed);
  }
  return dappsMap;
});
