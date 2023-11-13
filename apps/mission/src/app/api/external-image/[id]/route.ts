import { fetchExplorerData } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";
import { E } from "helpers";
import { notFound } from "next/navigation";

import { type NextRequest } from "next/server";
import { cache } from "react";

import sharp from "sharp";
export const dynamic = "error";
const getImageMap = cache(async () => {
  const { dApps } = await fetchExplorerData();

  const imageMap = new Map<string, string>();
  for (const dapp of dApps) {
    if (dapp.icon) {
      imageMap.set(dapp.icon.id, dapp.icon.url);
    }
    if (dapp.cover) {
      imageMap.set(dapp.cover.id, dapp.cover.url);
    }
  }
  return imageMap;
});

export async function generateStaticParams() {
  const imgMap = await getImageMap();

  return Array.from(imgMap.keys()).map((id) => ({
    id,
  }));
}

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const imgMap = await getImageMap();

  const imgUrl = imgMap.get(params.id);

  if (!imgUrl) {
    notFound();
  }

  const [fetchingError, img] = await E.try(() =>
    fetch(imgUrl, {
      signal: AbortSignal.timeout(10000),
    })
  );
  if (!img) {
    console.error("failed to fetch", params.id, imgUrl, fetchingError);

    notFound();
  }
  const buffer = await img.arrayBuffer();
  const [processingError, processedBuffer] = await E.try(() =>
    sharp(buffer)
      .resize({
        width: 1024,
        withoutEnlargement: true,
      })

      .png()
      .toBuffer()
  );

  if (!processedBuffer) {
    console.error("failed to process", params.id, imgUrl, processingError);
    notFound();
  }
  return new Response(processedBuffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
