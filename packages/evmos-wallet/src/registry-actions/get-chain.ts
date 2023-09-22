import { chains } from "@evmos-apps/registry";
import { Prefixish, normalizeToPrefix } from "./utils/normalize-to-prefix";

export const getChain = (prefixish: Prefixish) => {
  return chains[normalizeToPrefix(prefixish)];
};
