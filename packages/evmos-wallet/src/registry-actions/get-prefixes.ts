import { chains } from "@evmosapps/registry";
import { Prefix } from "./types";

export const prefixes = Object.values(chains).reduce((acc, chain) => {
  acc.add(chain.prefix);
  return acc;
}, new Set<Prefix>());
export const getPrefixes = () => prefixes;
