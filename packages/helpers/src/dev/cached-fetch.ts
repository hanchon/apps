import { tryCatch } from "../error-handling";
import { readDevCache, writeDevCache } from "./dev-cache-crud";
import { snakeCase } from "lodash-es";
import { hashString } from "../hash/hash-string";

// Custom header used for identifying cache status in the response
const cacheHeader = "evmos-dev-cache";

/**
 * Serialize HTTP headers into a key-value object.
 * @param {Headers} headers - The Headers object to serialize.
 * @returns {Record<string, string>} An object representing the headers.
 */
const serializeHeaders = (headers: Headers) => {
  const obj = new Map<string, string>();
  headers.forEach((v: string, k: string) => {
    obj.set(k, v);
  });
  return Object.fromEntries(obj);
};
/**
 * Enhanced fetch function with caching for development and test environments.
 * Caches the results of HTTP requests to improve performance during development.
 *
 * @param {RequestInfo | URL} input - The resource URL or RequestInfo object.
 * @param {RequestInit & { devCache?: { revalidate?: number; tags?: string[]; }}} [init] - Custom fetch options with optional cache settings.
 * @returns {Promise<Response>} A promise that resolves to the Response object.
 */
export const cachedFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit & {
    devCache?: {
      revalidate?: number;
      tags?: string[];
    };
  }
) => {
  // Bypass caching in non-development environments
  if (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test")
    return fetch(input, init);

  const url = new URL(input instanceof Request ? input.url : input);

  // Generate cache tags based on URL, HTTP method, and additional provided tags
  const cacheTags = [
    snakeCase(url.host),
    init?.method?.toUpperCase() ?? "GET",
    ...(init?.devCache?.tags ?? []),
  ];

  // Add a hash of the URL to the cache tags for uniqueness
  cacheTags.push(hashString(url.toString()));
  const cacheKey = cacheTags.join("-");

  // Attempt to read from cache
  const cached = await readDevCache<{
    url: string;
    method: string;
    statusText: string;
    headers: Record<string, string>;
    status: number;
    response: string;
  }>(cacheKey, init?.devCache?.revalidate);

  // Function to perform a fetch request and update cache
  const req = async () => {
    const response = await fetch(input, init);

    // Set custom header to indicate cache miss
    response.headers.set(cacheHeader, "MISS");
    if (!response.ok) {
      return response;
    }

    // Convert response to text and handle any errors
    const [err, responseAsString] = await tryCatch(() =>
      response.clone().text()
    );

    if (err) {
      return response;
    }

    // Write response to cache
    await writeDevCache(
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

  // Return cached response or perform a request if cache is missing/stale
  if (!cached) {
    return req();
  }

  // Create a response from the cached data
  const response = new Response(cached.data.response, {
    statusText: cached.data.statusText,
    status: cached.data.status,
    headers: cached.data.headers,
  });

  // Handle stale cache by making a new request in the background
  if (cached.stale) {
    response.headers.set(cacheHeader, "STALE");
    void req();
  } else {
    // Indicate a cache hit with a custom header
    response.headers.set(cacheHeader, "HIT");
  }

  return response;
};
