import { TOKENS_BY_DENOM } from "./get-token-by-denom";

export const tokens = Object.values(TOKENS_BY_DENOM);
export const getTokens = () => tokens;
