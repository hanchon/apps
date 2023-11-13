import { z } from "zod";

import { relationSchema } from "../partials/relationSchema";
import { richTextSchema } from "../partials/richTextSchema";
import { titleSchema } from "../partials/titleSchema";
import { createNotionPropertiesSchema } from "./createNotionPropertiesSchema";

const categoryPropertiesSchema = createNotionPropertiesSchema(
  z.object({
    displayName: richTextSchema,
    projects: relationSchema,
    name: titleSchema,
    description: richTextSchema,
    subItem: relationSchema,
  })
);

export const categorySchema = z
  .object({
    id: z.string(),
    created_time: z.string(),
    last_edited_time: z.string(),
    properties: categoryPropertiesSchema,
  })
  .transform(({ id, created_time, last_edited_time, properties }) => ({
    notionId: id,
    createdAt: created_time,
    updatedAt: last_edited_time,
    localized: {} as Record<
      string,
      {
        name: string;
        description: string;
      }
    >,
    ...properties,
  }));
