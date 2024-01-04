import "server-only";
import findCacheDirectory from "find-cache-dir";
import { readFile, writeFile, mkdir } from "fs/promises";
import { ArgumentsType } from "vitest";
import path from "path";
import os from "os";
import { E } from "../error-handling";
import { Log } from "helpers/src/logger";

const cacheDir =
  findCacheDirectory({ name: "evmosapps" }) ??
  path.join(os.tmpdir(), "evmosapps");

/**
 * Caches the result of a function in development mode only.
 *
 * To clear the cache, run 'pnpm -w clear-dev-cache'
 */

export const devModeCache = <T extends (...args: any[]) => Promise<unknown>>(
  fn: T,
  options: {
    /**
     * The cache key for the function. Can be a string or a function that generates the cache key based on the function arguments.
     * if not provided, the function name will be used
     */
    cacheKey?: string | ((...args: ArgumentsType<T>) => string);
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
  let { cacheKey, revalidate = 60 * 5, staleWhileRevalidate = true } = options;

  if (process.env.NODE_ENV === "test") {
    staleWhileRevalidate = false;
  }
  const req = async (...args: ArgumentsType<T>) => {
    const resolvedKey =
      typeof cacheKey === "function" ? cacheKey(...args) : cacheKey ?? fn.name;
    if (!resolvedKey)
      throw new Error(
        "if cacheKey is not provided, a named function is required"
      );
    const cachePath = path.join(cacheDir, resolvedKey);

    const [readErr, cached] = await E.try(
      () =>
        readFile(cachePath, "utf8").then(JSON.parse) as Promise<{
          date: number;
          response: unknown;
        }>
    );

    const fetchAndCache = async () => {
      await mkdir(cacheDir, { recursive: true });
      const response = await fn.call(null, ...args);

      const [err, responseAsString] = E.try(() =>
        JSON.stringify({
          date: Date.now(),
          response,
        })
      );
      if (err) {
        throw new Error(
          `response of ${resolvedKey} is not serializable: ${err.message}`
        );
      }

      await writeFile(cachePath, responseAsString);

      Log("dev-cache-mode").info(
        `Response cached for key '${resolvedKey}'`,
        `\ncacheDir: ${cacheDir}`
      );

      return response as Awaited<ReturnType<T>>;
    };
    if (readErr) return fetchAndCache();

    const isStale = Date.now() - cached.date > revalidate * 1000;

    if (isStale && staleWhileRevalidate) {
      // revalidate in background
      void fetchAndCache();
      return cached.response as Awaited<ReturnType<T>>;
    }

    return fetchAndCache();
  };

  return req as T;
};
