import { cachedFetchChains } from "@evmosapps/registry/src/fetch-chains";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
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

  const { chains, dt } = await cachedFetchChains();

  const chain = chains.find((chain) => chain.identifier === chainId);
  if (!chain) {
    return new Response("Chain not found", { status: 404 });
  }
  const route = chain.web3?.[0];
  if (!route) {
    return new Response("Chain jsrpc url not found", { status: 404 });
  }

  const body = await request.text();

  const res = await fetch(route, {
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
      "test-cache-time": dt,
    },
  });
}
