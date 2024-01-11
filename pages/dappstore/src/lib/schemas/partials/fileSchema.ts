import { z } from "zod";
import { externalSchema } from "./externalSchema";

const fileSchema = z
  .object({
    type: z.literal("file"),
    file: z.object({
      url: z.string(),
    }),
  })
  .transform(({ type, file }) => ({
    type,
    url: file.url ?? null,
  }));

export const filesSchema = z
  .object({
    type: z.literal("files"),
    files: z.array(z.union([fileSchema, externalSchema])),
  })
  .transform(({ files }) => files[0]?.url ?? null);
