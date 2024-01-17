import { bech32 } from "bech32";
import { HexAddress, CosmosAddress } from "./types";

/**
 * Converts an Ethereum address to an Evmos address.
 * @param address - The Ethereum address to convert.
 * @returns The Cosmos address.
 */

export const ethToEvmos = (address: HexAddress): CosmosAddress => {
  const words = bech32.toWords(Buffer.from(address.slice(2), "hex"));
  return bech32.encode("evmos", words) as CosmosAddress;
};
