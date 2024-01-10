import { z } from "zod";
import { categorySchema } from "./schemas/entities/categorySchema";

import { EVMOS_UTILS_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import { Log } from "helpers";
import { notion } from "helpers/src/clients/notion";
import { evmosUtilsSchema } from "./schemas/entities/evmosUtilsSchema";

const fetchNotionEvmosUtils = async () =>
  notion.databases.query({
    database_id: EVMOS_UTILS_PAGE_NOTION_ID,
  });

export const fetchEvmosUtils = async () => {
  const evmosUtils = await fetchNotionEvmosUtils();
  console.log("evmosUtils: ", evmosUtils);
  //   return evmosUtils.results.reduce<
  //     Map<string, z.output<typeof evmosUtilsSchema>>
  //   >((acc, category) => {
  //     const parsed = categorySchema.safeParse(category);

  //     if (!parsed.success) {
  //       Log("notion").error(parsed.error.issues);
  //       return acc;
  //     }

  //     parsed.data.localized = Object.fromEntries(
  //       parsed.data.subItem.map((notionId) => {
  //         const subItem = acc.get(notionId);
  //         acc.delete(notionId);
  //         if (!subItem || !subItem?.language) {
  //           throw new Error("Sub-item not found");
  //         }
  //         return [
  //           subItem.language,
  //           {
  //             name: subItem.name,
  //             description: subItem?.description,
  //           },
  //         ];
  //       })
  //     );
  //     acc.set(parsed.data.notionId, parsed.data);

  //     return acc;
  //   }, new Map());
};
