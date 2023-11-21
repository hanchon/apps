import { writeFile, mkdir, stat } from "fs/promises";
import path from "path";
import { E, Log } from "helpers";
import { memoize } from "lodash-es";
import { cache } from "react";

const imagesDir = path.join(process.cwd(), "public/prefetched-images");
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const memoizeFn =
  process.env.NODE_ENV === "development" ? (memoize as typeof cache) : cache;
export const predownloadImages = memoizeFn(
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
