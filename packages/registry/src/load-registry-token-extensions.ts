import { TokenEntity } from "../autogen/token-entity";

export const loadRegistryTokenExtensions = async () => {
  const tokens = await import("./extend-registry/tokens");
  return Object.values(tokens) as unknown as TokenEntity[];
};
