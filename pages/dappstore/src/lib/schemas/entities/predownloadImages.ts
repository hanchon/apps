import { writeFile, mkdir, readFile } from "fs/promises";
import sharp from "sharp";
import path from "path";
import { E, Log } from "helpers";
import { memoize } from "lodash-es";
import { cache } from "react";

const imagesDir = path.join(process.cwd(), "public/prefetched-images");
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const memoizeFn =
  process.env.NODE_ENV === "development" ? (memoize as typeof cache) : cache;

const bufferToBase64 = (buffer: Buffer) =>
  `data:image/png;base64,${buffer.toString("base64")}`;
export const predownloadImages = memoizeFn(
  async <
    T extends {
      [key: string]: string | null;
    },
  >(
    prefix: string,
    images: T
  ): Promise<{
    [K in keyof T]: {
      blurDataURL: string;
      src: string;
    } | null;
  }> => {
    const promise = await Promise.all(
      Object.entries(images).map(async ([key, value]) => {
        if (!value) {
          return [key, null] as const;
        }

        const fileNameFromurl = new URL(value).pathname.split("/").pop();
        const fileType = fileNameFromurl?.split(".").pop();

        const fileName = `${prefix}-${key}.${fileType}`;
        const filePath = path.join(imagesDir, fileName);

        const blurImageFileName = `${prefix}-${key}-blur.png`;
        const blurImagePath = path.join(imagesDir, blurImageFileName);

        const [, blurImageBuffer] = await E.try(() => readFile(blurImagePath));

        if (blurImageBuffer) {
          // File has already been downloaded
          // clear the mission/public/prefetched-images folder if you want to refetch it
          return [
            key,
            {
              blurDataURL: bufferToBase64(blurImageBuffer),
              src: `/prefetched-images/${fileName}`,
            },
          ] as const;
        }
        Log().info(`Downloading ${key} image for ${prefix}: \n${value}`);
        const retries = process.env.NODE_ENV === "development" ? 1 : 5;

        for (let i = retries; i >= 0; i--) {
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
            const blurImageBuffer = await sharp(buffer)
              .resize({
                width: 16,
              })
              .png()
              .toBuffer();
            await writeFile(blurImagePath, Buffer.from(blurImageBuffer));

            return [
              key,
              {
                blurDataURL: bufferToBase64(blurImageBuffer),
                src: `/prefetched-images/${fileName}`,
              },
            ] as const;
          } catch (e) {
            Log().error(e);
            if (i > 0) {
              Log().info(`Retrying ${key} image for ${prefix}: \n${value}`);
              await delay(3000);
            }
          }
        }
        if (process.env.NODE_ENV === "development") {
          return [key, null] as const;
        }
        throw new Error(`Failed to fetch ${key} image for ${prefix}: ${value}`);
      })
    );

    return Object.fromEntries(promise) as {
      [K in keyof T]: {
        blurDataURL: string;
        src: string;
      } | null;
    };
  }
);
