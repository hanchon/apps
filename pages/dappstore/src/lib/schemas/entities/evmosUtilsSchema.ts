import { z } from "zod";

import { checkboxSchema } from "../partials/checkboxSchema";
import { richTextSchema } from "../partials/richTextSchema";
import { titleSchema } from "../partials/titleSchema";

export const evmosUtilsSchema = z.object({
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
