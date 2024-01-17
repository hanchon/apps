import { chains } from "@evmosapps/registry";

export const prefixes = Object.values(chains).reduce((acc, chain) => {
  acc.add(chain.prefix);
  return acc;
}, new Set<string>());
export const getPrefixes = () => prefixes;
