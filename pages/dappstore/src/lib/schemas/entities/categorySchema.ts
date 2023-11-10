import { z } from "zod";

import { relationSchema } from "../partials/relationSchema";
import { richTextSchema } from "../partials/richTextSchema";
import { titleSchema } from "../partials/titleSchema";

export const categoryPropertiesSchema = z
  .object({
    "Display Name": richTextSchema,
    Projects: relationSchema,
    Name: titleSchema,
    Description: richTextSchema,
    "Sub-item": relationSchema,
  })
  .transform((data) => ({
    projectNotionIds: data.Projects,
    subItemNotionIds: data["Sub-item"],
    name: data.Name,
    displayName: data["Display Name"],
    description: data.Description,
  }));

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
