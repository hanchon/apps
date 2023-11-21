import { z } from "zod";
import { richTextSchema } from "../partials/richTextSchema";
import { relationSchema } from "../partials/relationSchema";
import { titleSchema } from "../partials/titleSchema";

import { checkboxSchema } from "../partials/checkboxSchema";
import { urlSchema } from "../partials/urlSchema";
import { filesSchema } from "../partials/fileSchema";
import { createNotionPropertiesSchema } from "../utils/createNotionPropertiesSchema";
import { createdAtSchema } from "../partials/createdAtSchema";
import { updatedAtSchema } from "../partials/updatedAtSchema";
import { selectSchema } from "../partials/selectSchema";
import slugify from "slugify";
import { predownloadImages } from "./predownloadImages";

const dappPropertiesSchema = createNotionPropertiesSchema(
  z.object({
    icon: filesSchema,
    cover: filesSchema,
    thumbnail: filesSchema,
    instantDapp: checkboxSchema,
    name: titleSchema,
    description: richTextSchema,
    oneLiner: richTextSchema,
    howTo: richTextSchema,
    subItem: relationSchema,
    x: urlSchema,
    dapp: urlSchema,
    project: urlSchema,
    github: urlSchema,
    discord: urlSchema,
    telegram: urlSchema,
    updatedAt: updatedAtSchema,
    createdAt: createdAtSchema,
    language: selectSchema,
  })
);

export const dappSchema = z
  .object({
    id: z.string(),
    properties: dappPropertiesSchema,
  })
  .transform(async ({ id, properties, ...rest }) => {
    const slug = slugify(properties.name, {
      lower: true,
      trim: true,
    });
    const { cover, thumbnail, icon, ...propetyRest } = properties;
    const images = await predownloadImages(slug, {
      cover,
      thumbnail,
      icon,
    });
    // console.log(images);
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
      ...propetyRest,
      ...images,
      ...rest,
    };
  });
