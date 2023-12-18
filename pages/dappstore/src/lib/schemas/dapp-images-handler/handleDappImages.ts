import { z } from "zod";
import { dappSchema } from "../entities/dappSchema";
import { E, Log } from "helpers";
import { sha256 } from "@noble/hashes/sha256";
import path from "path";
import { readFile, stat, mkdir, writeFile } from "fs/promises";
import sharp from "sharp";
import { toHex } from "viem";
import { cache } from "react";

const imagesDir = path.join(process.cwd(), "public/prefetched-images");

const bufferToBase64 = (buffer: Buffer) =>
  `data:image/png;base64,${buffer.toString("base64")}`;

const loadLocalImage = async (fileName: string) => {
  const imagePath = path.join(imagesDir, fileName);
  try {
    await stat(imagePath);
  } catch (e) {
    throw new Error(`Image ${fileName} not found`);
  }

  const blurImage = imagePath.replace(".png", "-blur.png");
  const [, blurImageBuffer] = await E.try(() => readFile(blurImage));
  if (!blurImageBuffer) {
    throw new Error(`Blur image ${blurImage} not found`);
  }
  return {
    blurDataURL: bufferToBase64(blurImageBuffer),
    src: `/prefetched-images/${fileName}`,
  };
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchImageData = async (url: string) => {
  const retries = 5;
  const retryInterval = 3000;
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, {
      cache: "no-cache",
    });
    if (!response.ok) {
      await delay(retryInterval);
      continue;
    }
    const [, buffer] = await E.try(() => response.arrayBuffer());
    if (!buffer) {
      throw new Error(`Invalid image: Failed to read buffer from image ${url}`);
    }
    return buffer;
  }
  throw new Error(`Failed to fetch image ${url}`);
};

const generateBlurImage = async (imageData: ArrayBuffer) => {
  return await sharp(imageData)
    .resize({
      width: 16,
    })
    .png()
    .toBuffer();
};

const downloadDAppImage = cache(async (url: string, fileName: string) => {
  Log("notion").info(`Downloading image for ${fileName}`);

  const imagePath = path.join(imagesDir, fileName);
  const imageData = await fetchImageData(url);
  const blurImageData = await generateBlurImage(imageData);
  const blurImage = imagePath.replace(".png", "-blur.png");

  await E.try(() => mkdir(imagesDir, { recursive: true }));
  await writeFile(imagePath, Buffer.from(imageData));
  await writeFile(blurImage, Buffer.from(blurImageData));
  return {
    blurDataURL: bufferToBase64(blurImageData),
    src: `/prefetched-images/${fileName}`,
  };
});

const handleSingleImage = cache(async (url: string, identifier: string) => {
  const urlObject = new URL(url);
  urlObject.search = "";
  const imageHash = toHex(sha256(urlObject.toString())).slice(2, 10);

  const fileName = `${identifier}-${imageHash}.png`;

  try {
    return await loadLocalImage(fileName);
  } catch (e) {
    return await downloadDAppImage(url, fileName);
  }
});

export const handleDappImages = async (
  dapps: z.output<typeof dappSchema>[]
) => {
  return await Promise.all(
    dapps.map(async (dapp) => {
      const { cover, thumbnail, icon, ...rest } = dapp;
      return {
        ...rest,
        cover: cover
          ? await handleSingleImage(cover, `${rest.slug}-cover`)
          : null,
        thumbnail: thumbnail
          ? await handleSingleImage(thumbnail, `${rest.slug}-thumbnail`)
          : null,
        icon: icon ? await handleSingleImage(icon, `${rest.slug}-icon`) : null,
      };
    })
  );
};
