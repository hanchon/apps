import { chains } from "@evmos-apps/registry";

export const sortedChains = Object.values(chains)
  .map(({ prefix }) => prefix)
  .sort((a, b) => {
    if (a === "evmos") return -1;
    if (b === "evmos") return 1;

    return a > b ? 1 : -1;
  });
