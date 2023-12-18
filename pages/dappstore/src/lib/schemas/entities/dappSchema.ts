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
import { predownloadImages } from "./predownloadImages";
import { parseUrl } from "helpers/src/parse/urls";
import { createSlug } from "../utils/createSlug";

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
    listed: checkboxSchema,
    x: urlSchema.transform((url) => ({
      url,
      label: url && parseUrl(url),
    })),
    dapp: urlSchema.transform((url) => ({
      url,
      label: url && parseUrl(url),
    })),
    project: urlSchema,
    github: urlSchema,
    discord: urlSchema.transform((url) => ({
      url,
      label: url && parseUrl(url),
    })),
    telegram: urlSchema.transform((url) => ({
      url,
      label: url && parseUrl(url),
    })),
    updatedAt: updatedAtSchema,
    createdAt: createdAtSchema,
    language: selectSchema,
    categories: relationSchema,
  })
);

export const dappSchema = z
  .object({
    id: z.string(),
    properties: dappPropertiesSchema,
  })
  .transform(async ({ id, properties, ...rest }) => {
    const slug = createSlug(properties.name);
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
