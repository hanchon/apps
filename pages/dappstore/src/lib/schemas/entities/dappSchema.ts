import { z } from "zod";
import { richTextSchema } from "../partials/richTextSchema";
import { relationSchema } from "../partials/relationSchema";
import { titleSchema } from "../partials/titleSchema";

import { checkboxSchema } from "./checkboxSchema";
import { urlSchema } from "./urlSchema";
import { emojiSchema } from "./emojiSchema";
import { fileSchema } from "./fileSchema";
import { externalSchema } from "./externalSchema";
import { createNotionPropertiesSchema } from "./createNotionPropertiesSchema";
import { createdAtSchema } from "./createdAtSchema";
import { updatedAtSchema } from "./updatedAtSchema";
import { selectSchema } from "./selectSchema";
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
        if (icon && "url" in icon && icon.url) {
          return icon.url;
        }
        return null;
      }),

    cover: z
      .union([fileSchema, externalSchema, z.null()])
      .transform((cover) => {
        if (!cover || !cover.url) return null;
        return cover.url;
      }),
  })
  .transform(({ icon, cover, id, properties }) => {
    const slug = slugify(properties.name, {
      lower: true,
      trim: true,
    });
    return {
      notionId: id,
      icon: icon
        ? {
            id: `${slug}-icon`,
            url: icon,
          }
        : null,
      cover: cover
        ? {
            id: `${slug}-cover`,
            url: cover,
          }
        : null,
      slug,
      localized: {} as Record<
        string,
        {
          name: string;
          description: string;
        }
      >,
      ...properties,
    };
  });
