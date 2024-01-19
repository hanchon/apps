import { bech32 } from "bech32";
import { CosmosAddress } from "./types";

export const isValidCosmosAddress = (
  address: unknown,
  expectedPrefixes?: string[]
): address is CosmosAddress => {
  if (typeof address !== "string") {
    return false;
  }
  try {
    const { prefix, words } = bech32.decode(address);
    if (expectedPrefixes && !expectedPrefixes.includes(prefix)) {
      return false;
    }
    const size = bech32.fromWords(words).length;
    if (size !== 20 && size !== 32) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};
