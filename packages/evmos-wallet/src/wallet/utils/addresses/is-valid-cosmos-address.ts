import { bech32 } from "bech32";
import { CosmosAddress } from "./types";

export const isValidCosmosAddress = <TPrefix extends string = string>(
  address: string,
  expectedPrefixes?: TPrefix[]
): address is CosmosAddress<TPrefix> => {
  try {
    const { prefix, words } = bech32.decode(address);
    if (expectedPrefixes && !expectedPrefixes.includes(prefix as TPrefix)) {
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
