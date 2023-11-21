import { z } from "zod";
import { richTextSchema } from "../partials/richTextSchema";
import { relationSchema } from "../partials/relationSchema";
import { titleSchema } from "../partials/titleSchema";

import { checkboxSchema } from "../partials/checkboxSchema";
import { urlSchema } from "../partials/urlSchema";
import { emojiSchema } from "../partials/emojiSchema";
import { fileSchema, filesSchema } from "../partials/fileSchema";
import { externalSchema } from "../partials/externalSchema";
import { createNotionPropertiesSchema } from "../utils/createNotionPropertiesSchema";
import { createdAtSchema } from "../partials/createdAtSchema";
import { updatedAtSchema } from "../partials/updatedAtSchema";
import { selectSchema } from "../partials/selectSchema";
import slugify from "slugify";

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

import { writeFile, mkdir, stat } from "fs/promises";
import path from "path";
import { E, Log } from "helpers";
import { memoize } from "lodash-es";

const imagesDir = path.join(process.cwd(), "public/prefetched-images");

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const predownloadImages = memoize(
  async <T extends Record<string, string | null>>(
    prefix: string,
    images: T
  ): Promise<T> => {
    const promise = Promise.all(
      Object.entries(images).map(async ([key, value]) => {
        if (!value) {
          Log().info(`No icon ${key} for ${prefix}`);
          return [key, null] as const;
        }

        const fileNameFromurl = new URL(value).pathname.split("/").pop();
        const fileType = fileNameFromurl?.split(".").pop();
        const fileName = `${prefix}-${key}.${fileType}`;
        const filePath = path.join(imagesDir, fileName);

        const [, stats] = await E.try(() => stat(filePath));
        if (stats) {
          // File has already been downloaded
          // clear the mission/public/prefetched-images folder if you want to refetch it

          return [key, `/prefetched-images/${fileName}`] as const;
        }
        Log().info(`Downloading ${key} image for ${prefix}: \n${value}`);
        const retries = 10;
        for (let i = retries; i - 5; i--) {
          try {
            const response = await fetch(value, {
              cache: "no-cache",
            });
            if (!response.ok) {
              throw new Error(
                `Failed to fetch ${key} image for ${prefix}: ${value}`
              );
            }
            const buffer = await response.arrayBuffer();

            await E.try(() => mkdir(imagesDir, { recursive: true }));
            await writeFile(filePath, Buffer.from(buffer));
            return [key, `/prefetched-images/${fileName}`] as const;
          } catch (e) {
            Log().error(e);
            if (i > 0) {
              Log().info(`Retrying ${key} image for ${prefix}: \n${value}`);
              await delay(3000);
            }
          }
        }
        throw new Error(`Failed to fetch ${key} image for ${prefix}: ${value}`);
      })
    );

    return Object.fromEntries(await promise) as T;
  }
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
