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

  const parsed = evmosUtilsSchema.safeParse(evmosUtils);

  if (!parsed.success) {
    Log("notion").error(parsed.error.issues);
    return {};
  }
  return parsed.data.results[0]?.properties;
};
