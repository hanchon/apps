import { getChains } from "./get-chain";

const tokens = getChains().flatMap((chain) => {
  return [...chain.tokens];
});
export const getTokens = () => tokens;
