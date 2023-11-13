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
import { sha256 } from "@noble/hashes/sha256";
import { createdAtSchema } from "./createdAtSchema";
import { updatedAtSchema } from "./updatedAtSchema";
import { selectSchema } from "./selectSchema";

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

const hashUrl = (url: string) => {
  return Buffer.from(sha256(url)).toString("hex");
};
export const dappSchema = z
  .object({
    id: z.string(),
    properties: dappPropertiesSchema,
    icon: z
      .union([emojiSchema, fileSchema, externalSchema, z.null()])
      .transform((icon) => {
        if (icon && "url" in icon) {
          return {
            id: hashUrl(icon.url),
            url: icon.url,
          };
        }
        return null;
      }),

    cover: z
      .union([fileSchema, externalSchema, z.null()])
      .transform((cover) => {
        if (!cover) return null;
        return {
          id: hashUrl(cover.url),
          url: cover.url,
        };
      }),
  })
  .transform(({ icon, cover, id, properties }) => ({
    notionId: id,
    icon,
    cover,
    localized: {} as Record<
      string,
      {
        name: string;
        description: string;
      }
    >,
    ...properties,
  }));
