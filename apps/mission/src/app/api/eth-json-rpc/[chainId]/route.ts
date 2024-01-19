import { fetchPreferredEvmJsonRpcUrl } from "@evmosapps/trpc/procedures/metrics/queries/fetch-preferred-evm-json-rpc-url";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params: { chainId },
  }: {
    params: {
      chainId: string;
    };
  }
) {
  if (!["evmos", "evmostestnet", "evmoslocalnet"].includes(chainId)) {
    return new Response("Chain not supported", { status: 404 });
  }
  const { preferred } = await fetchPreferredEvmJsonRpcUrl(chainId);

  const body = await request.text();

  const res = await fetch(preferred, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body,
  });
  return new NextResponse(res.body, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "",
    },
  });
}
