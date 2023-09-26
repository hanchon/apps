import { chains } from "@evmos-apps/registry";

export const tokens = Object.values(chains).flatMap((chain) => [
  ...chain.tokens,
]);
export const getTokens = () => tokens;
