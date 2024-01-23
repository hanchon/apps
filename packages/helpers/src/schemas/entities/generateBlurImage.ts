// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";

import sharp from "sharp";
import { unstable_cache } from "next/cache";
import { cachedFetch } from "../../dev/cached-fetch";
const bufferToBase64 = (buffer: Buffer) =>
  `data:image/png;base64,${buffer.toString("base64")}`;
export const generateBlurImage = unstable_cache(
  async (src: string) => {
    if (process.env.NODE_ENV === "development") {
      return bufferToBase64(Buffer.from([]));
    }
    const buffer = await cachedFetch(src, {
      next: {
        revalidate: 60 * 60 * 24 * 7,
      },
    }).then((res) => res.arrayBuffer());
    const data = await sharp(Buffer.from(buffer)).resize(8, 8).png().toBuffer();

    return bufferToBase64(data);
  },
  ["image"],
  {
    revalidate: 60 * 60 * 24 * 7,
  },
);
