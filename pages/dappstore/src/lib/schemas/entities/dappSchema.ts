import { z } from "zod";
import { richTextSchema } from "../partials/richTextSchema";
import { relationSchema } from "../partials/relationSchema";
import { titleSchema } from "../partials/titleSchema";

import { checkboxSchema } from "../partials/checkboxSchema";
import { urlSchema } from "../partials/urlSchema";
import { emojiSchema } from "../partials/emojiSchema";
import { fileSchema } from "../partials/fileSchema";
import { externalSchema } from "../partials/externalSchema";
import { createNotionPropertiesSchema } from "./createNotionPropertiesSchema";
import { createdAtSchema } from "../partials/createdAtSchema";
import { updatedAtSchema } from "../partials/updatedAtSchema";
import { selectSchema } from "../partials/selectSchema";
import slugify from "slugify";

const dappPropertiesSchema = createNotionPropertiesSchema(
  z.object({
    locale: selectSchema,
    instantDapp: checkboxSchema,
    name: titleSchema,
    description: richTextSchema,
    shortDescription: richTextSchema,
    subItem: relationSchema,
    twitter: urlSchema,
    app: urlSchema,
    github: urlSchema,
    discord: urlSchema,
    updatedAt: updatedAtSchema,
    createdAt: createdAtSchema,
  })
);

export const dappSchema = z
  .object({
    id: z.string(),
    properties: dappPropertiesSchema,
    icon: z
      .union([emojiSchema, fileSchema, externalSchema, z.null()])
      .transform((icon) => {
        if (icon?.type === "file") return icon.url;
        return null;
      }),

    cover: z
      .union([fileSchema, externalSchema, z.null()])
      .transform((cover) => {
        if (cover?.type === "file") return cover.url;
        return null;
      }),
  })
  .transform(({ id, properties, ...rest }) => {
    const slug = slugify(properties.name, {
      lower: true,
      trim: true,
    });
    return {
      notionId: id,
      slug,
      localized: {} as Record<
        string,
        {
          name: string;
          description: string;
        }
      >,
      ...properties,
      ...rest,
    };
  });
