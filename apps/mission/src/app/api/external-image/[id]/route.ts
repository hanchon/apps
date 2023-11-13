import { fetchExplorerData } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";
import { NextApiRequest, NextApiResponse } from "next";
import { type NextRequest } from "next/server";
import { cache } from "react";

import sharp from "sharp";

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
})();

export async function generateStaticParams() {
  const imgMap = await getImageMap;

  return Array.from(imgMap.keys()).map((id) => ({
    params: {
      id,
    },
  }));
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { dApps } = await fetchExplorerData();

  const imgMap = await getImageMap;

  const imgUrl = imgMap.get(params.id);

  if (!imgUrl) {
    return new Response("Not found", { status: 404 });
  }

  const img = await fetch(imgUrl);
  const buffer = await img.arrayBuffer();

  return new Response(
    await sharp(buffer)
      .resize({
        width: 1024,
        withoutEnlargement: true,
      })
      .png()
      .toBuffer(),
    {
      headers: {
        "Content-Type": "image/png",
      },
    }
  );
}
