import { sha256 } from "@noble/hashes/sha256";
import { tryCatch } from "./error-handling";
import { readCache, writeCache } from "./dev/dev-mode-cache";
import { snakeCase } from "lodash-es";

const cacheHeader = "evmos-dev-cache";
const serializeHeaders = (headers: Headers) => {
  const obj = new Map<string, string>();
  headers.forEach((v, k) => {
    obj.set(k as string, v as string);
  });
  return Object.fromEntries(obj);
};
export const cachedFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit & {
    devCache?: {
      revalidate?: number;
      tags?: string[];
    };
  }
) => {
  if (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test")
    return fetch(input, init);

  const url = new URL(input instanceof Request ? input.url : input);

  const cacheTags = [
    snakeCase(url.host),
    init?.method?.toUpperCase() ?? "GET",
    ...(init?.devCache?.tags ?? []),
  ];

  cacheTags.push(Buffer.from(sha256(url.toString())).toString("base64url"));
  const cacheKey = cacheTags.join("-");

  const cached = await readCache<{
    url: string;
    method: string;
    statusText: string;
    headers: Record<string, string>;
    status: number;
    response: string;
  }>(cacheKey, init?.devCache?.revalidate);

  const req = async () => {
    const response = await fetch(input, init);

    response.headers.set(cacheHeader, "MISS");
    if (!response.ok) {
      return response;
    }

    const [err, responseAsString] = await tryCatch(() =>
      response.clone().text()
    );

    if (err) {
      return response;
    }

    await writeCache(
      cacheKey,
      {
        url: url.toString(),
        method: init?.method ?? "GET",
        headers: serializeHeaders(response.headers),
        statusText: response.statusText,
        status: response.status,
        response: responseAsString,
      },
      cacheTags
    );
    return response;
  };

  if (!cached) {
    return req();
  }

  const response = new Response(cached.data.response, {
    statusText: cached.data.statusText,
    status: cached.data.status,
    headers: cached.data.headers,
  });

  if (cached.stale) {
    response.headers.set(cacheHeader, "STALE");
    void req();
  } else {
    response.headers.set(cacheHeader, "HIT");
  }

  return response;
};
