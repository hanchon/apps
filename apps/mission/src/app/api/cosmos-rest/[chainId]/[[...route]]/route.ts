import { fetchPreferredCosmosRestUrl } from "@evmosapps/trpc/procedures/metrics/queries/fetch-preferred-cosmos-rest-url";
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
  },
) {
  const { preferred } = await fetchPreferredCosmosRestUrl(chainId);
  const url = new URL(preferred);

  url.pathname = path.join(url.pathname, ...route);
  url.search = new URL(request.url).search;

  const res = await fetch(url.toString());
  return new NextResponse(res.body, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "",
    },
  });
}
