import path from "path";
import { writeFile } from "fs/promises";
import sharp from "sharp";

import { assetsDir } from "./constants.ts";
export const downloadAsset = async (
  url: string,
  assetsDir: string,
  filename: string
) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}`);
  const buffer = await res.arrayBuffer();

  filename = `${filename}${path.extname(url)}`;

  const filePath = path.resolve(assetsDir, filename);
  await writeFile(filePath, Buffer.from(buffer));
  return filename;
};

const tryCatch = async <T>(fn: () => Promise<T>) => {
  try {
    return await fn();
  } catch (e) {
    return null;
  }
};

export const generateAssets = async (
  denom: string,
  pngUrl?: string,
  svgUrl?: string
) => {
  let png = pngUrl
    ? (await tryCatch(() => downloadAsset(pngUrl, assetsDir, denom))) ?? ""
    : "";
  const svg = svgUrl
    ? await tryCatch(() => downloadAsset(svgUrl, assetsDir, denom))
    : "";

  if (!png) {
    if (!svg) {
      throw new Error(`No assets for ${denom}`);
    }
    console.log(`Generating png for ${denom}`);
    const buffer = Buffer.from(svg);
    const image = sharp(buffer);

    const pngBuffer = await image
      .resize({
        width: 200,
        height: 200,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    const filePath = path.resolve(assetsDir, denom);
    await writeFile(filePath, pngBuffer);
    png = `${denom}.png`;
  }
  return {
    png: `statics/${png}`,
    svg: svg ? `statics/${svg}` : undefined,
  };
};
