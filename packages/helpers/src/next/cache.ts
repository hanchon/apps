// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { unstable_cache } from "next/cache";
import { serialize, deserialize } from "superjson";

/**
 * wrapper around unstable_cache to bypass it in environments other than Next
 * It also adds support for caching bigint
 */
const cacheBypass: typeof unstable_cache = (fn) => {
  return fn;
};

const isNext = ["development", "test", "production"].includes(
  process.env.NODE_ENV,
);

type Callback = (...args: any[]) => Promise<unknown>;

function _cache<T extends Callback>(
  cb: T,
  keyParts: string[] = [],
  options?: {
    revalidate?: number | false;
    tags?: string[];
  },
): T {
  const cachedFn = unstable_cache(
    async (...args: unknown[]) => {
      const res = await cb(...args);
      return serialize(res);
    },
    [cb.toString(), ...keyParts],
    options,
  );

  return (async (...args: unknown[]) => {
    const res = await cachedFn(...args);
    return deserialize(res);
  }) as T;
}
export const nextCache = isNext ? _cache : cacheBypass;
