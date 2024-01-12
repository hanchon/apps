import { Banner } from "@evmosapps/ui-helpers";
import { z } from "zod";
import { EVMOS_UTILS_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import { Log } from "helpers";
import { notion } from "helpers/src/clients/notion";
const checkboxSchema = z
  .object({
    checkbox: z.boolean(),
  })
  .transform(({ checkbox }) => checkbox);

const titleSchema = z
  .object({
    title: z.array(
      z.object({
        plain_text: z.string(),
      })
    ),
  })
  .transform((data) => {
    return data.title.map((text) => text.plain_text).join(" ");
  });

const richTextSchema = z
  .object({
    rich_text: z.array(
      z.object({
        plain_text: z.string(),
      })
    ),
  })
  .transform((data) => {
    return data.rich_text.map((text) => text.plain_text).join(" ");
  });

const evmosUtilsSchema = z.object({
  results: z.array(
    z.object({
      properties: z.object({
        Checkbox: checkboxSchema,
        Name: titleSchema,
        Description: richTextSchema,
      }),
    })
  ),
});

const fetchNotionEvmosUtils = async () =>
  await notion.databases.query({
    database_id: EVMOS_UTILS_PAGE_NOTION_ID,
  });

export const fetchEvmosUtils = async () => {
  const evmosUtils = await fetchNotionEvmosUtils();

  const parsed = evmosUtilsSchema.safeParse(evmosUtils);

  if (!parsed.success) {
    Log("notion").error(parsed.error.issues);
    return {};
  }
  return parsed.data.results[0]?.properties;
};

export const StatefulBanner = async () => {
  const data = await fetchEvmosUtils();
  return <Banner>{data.Description}</Banner>;
};
