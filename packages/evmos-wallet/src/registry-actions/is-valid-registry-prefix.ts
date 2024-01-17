import { prefixes } from "./get-prefixes";

export const isValidRegistryPrefix = (prefix: unknown): prefix is string =>
  prefixes.has(prefix as string);
