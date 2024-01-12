"use server";
import { z } from "zod";
import { EVMOS_UTILS_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import {
  Log,
  checkboxSchema,
  createNotionPropertiesSchema,
  richTextSchema,
  titleSchema,
} from "helpers";
import { notion } from "helpers/src/clients/notion";

const evmosUtilsPropertiesSchema = createNotionPropertiesSchema(
  z.object({
    checkbox: checkboxSchema.default(() => ({ checkbox: false })),
    name: titleSchema.default({ title: [{ plain_text: "" }] }),
    description: richTextSchema.default({ rich_text: [{ plain_text: "" }] }),
  })
);

const evmosUtilsSchema = z.object({
  properties: evmosUtilsPropertiesSchema,
});

const fetchNotionEvmosUtils = async () =>
  await notion.databases.query({
    database_id: EVMOS_UTILS_PAGE_NOTION_ID,
  });

const fetchEvmosUtils = async () => {
  const evmosUtils = await fetchNotionEvmosUtils();

  return evmosUtils.results.map((result) => {
    const parsed = evmosUtilsSchema.safeParse(result);

    if (!parsed.success) {
      Log("notion").error(parsed.error.issues);
      return {
        name: "",
        description: "",
        checkbox: false,
      };
    }

    return parsed.data.properties;
  });
};

export const getServiceDisruptionData = async () => {
  const data = await fetchEvmosUtils();
  const serviceStatus = data.find(
    (item) =>
      item.name.toLocaleLowerCase() === "Service disruption".toLocaleLowerCase()
  );
  if (serviceStatus === undefined || !serviceStatus?.checkbox) return null;
  return serviceStatus.description;
};
