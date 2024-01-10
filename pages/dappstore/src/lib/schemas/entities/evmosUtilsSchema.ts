import { z } from "zod";

export const evmosUtilsSchema = z.object({
  name: z.string(),
  description: z.string(),
  show: z.boolean(),
});
