import { readFile, writeFile, mkdir } from "fs/promises";

import path from "path";
import { sha256 } from "@noble/hashes/sha256";

import { E } from "../error-handling";
import { Log } from "helpers/src/logger";
import { fileURLToPath } from "node:url";

export const cacheDir = path.join(
  fileURLToPath(import.meta.url),
  "../../../../../node_modules/.cache/evmosapps"
);

export const writeCache = async (
  key: string,
  data: unknown,
  tags: string[]
) => {
  await mkdir(cacheDir, { recursive: true });
  Log("dev-cache-mode").info(
    `Response cached for key '${key}'`,
    `\ncacheDir: ${cacheDir}`
  );
  return await writeFile(
    path.join(cacheDir, key),
    JSON.stringify({
      tags,
      cacheDate: Date.now(),
      cacheKey: key,
      data,
    })
  );
};

export const readCache = async <T = unknown>(
  key: string,
  revalidate = 3600
) => {
  const [err, cached] = await E.try(
    () =>
      readFile(path.join(cacheDir, key), "utf8").then(JSON.parse) as Promise<{
        tags: string[];
        cacheDate: number;
        cacheKey: string;
        data: T;
      }>
  );
  if (err) return null;
  return {
    stale: Date.now() - cached.cacheDate > revalidate * 1000,
    ...cached,
  };
};
/**
 * Caches the result of a function in development mode only.
 *
 * To clear the cache, run 'pnpm -w clear-dev-cache'
 *
 * WHY THIS EXISTS???
 *
 * communication with external apis are subject to rate limits,
 * while we usually stay well below the limits for most things in production (because request are mostly done at build time)
 * we can easly hit some of these limits in development mode.
 * Not to mention that many Next caching features are disabled in dev mode.
 * That slows down hot reload and makes development a pain.
 *
 */

// eslint-disable-next-line @typescript-eslint/ban-types
export const devModeCache = <T extends Function>(
  fn: T,
  options: {
    /**
     * The cache key for the function. Can be a string or a function that generates the cache key based on the function arguments.
     * if not provided, the function name will be used
     */
    tags?: string[];
    /**
     * The cache duration in seconds.
     * @default 60 * 5 // (5 minutes)
     */
    revalidate?: number;
    /**
     * Determines whether to return the cached result while revalidating in the background.
     *
     * Disabled in test mode because vitest stops the process when the test is done, so the revalidation doesn't happen.
     */
    staleWhileRevalidate?: boolean;
  } = {}
): T => {
  if (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test")
    return fn;
  let { tags = [], revalidate = 60 * 5, staleWhileRevalidate = true } = options;

  if (process.env.NODE_ENV === "test") {
    staleWhileRevalidate = false;
  }
  const req = async (...args: unknown[]) => {
    tags = [...tags];
    if (tags.length === 0 && fn.name) {
      tags.push(fn.name);
    }
    tags.push(
      Buffer.from(sha256(JSON.stringify(args)).slice(0, 6)).toString(
        "base64url"
      )
    );

    tags.push(
      Buffer.from(sha256(fn.toString()).slice(0, 6)).toString("base64url")
    );
    const resolvedKey = tags.join("-");
    const cached = await readCache(resolvedKey, revalidate);

    const fetchAndCache = async () => {
      const response = (await fn.call(null, ...args)) as unknown;

      await writeCache(resolvedKey, response, tags);

      return response;
    };
    if (!cached) return fetchAndCache();

    if (cached.stale) {
      if (staleWhileRevalidate) {
        // revalidate in background
        void fetchAndCache();
        return cached.data;
      }
      return fetchAndCache();
    }

    return cached.data;
  };

  return req as never;
};
