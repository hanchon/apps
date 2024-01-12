import { fetchChains } from "@evmosapps/registry/src/fetch-chains";
import { NextResponse } from "next/server";
import path from "path";
export async function GET(
  request: Request,
  {
    params: { chainId, route = [] },
  }: {
    params: {
      chainId: string;
      route: string[];
    };
  }
) {
  const { chains } = await fetchChains();
  const chain = chains.find((chain) => chain.identifier === chainId);
  if (!chain) {
    return new Response("Chain not found", { status: 404 });
  }

  const url = new URL(chain.rest[0]);

  url.pathname = path.join(url.pathname, ...route);
  url.search = new URL(request.url).search;

  const res = await fetch(url.toString());
  return new NextResponse(res.body, {
    status: res.status,
  });
}
