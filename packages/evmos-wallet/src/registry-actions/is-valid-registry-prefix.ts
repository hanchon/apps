import { Prefix } from "./types";
import { prefixes } from "./get-prefixes";

export const isValidRegistryPrefix = (prefix: unknown): prefix is Prefix =>
  prefixes.has(prefix as Prefix);
