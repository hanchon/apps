import { z } from "zod";

import { checkboxSchema } from "../partials/checkboxSchema";
import { richTextSchema } from "../partials/richTextSchema";

export const evmosUtilsSchema = z.object({
  name: richTextSchema,
  description: richTextSchema,
  checkbox: checkboxSchema,
});
