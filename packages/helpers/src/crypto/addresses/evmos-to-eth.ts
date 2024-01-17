import { bech32 } from "bech32";
import { CosmosAddress, HexAddress } from "./types";
import { getAddress } from "viem";
import { isValidCosmosAddress } from "./is-valid-cosmos-address";

/**
 * Converts an Evmos address to an Ethereum address.
 * @param address - The Cosmos address to convert.
 * @returns The Ethereum address.
 */

export const evmosToEth = (address: CosmosAddress): HexAddress => {
  if (!isValidCosmosAddress(address)) {
    throw new Error("Invalid address");
  }
  const { words } = bech32.decode(address);
  return getAddress(
    `0x${Buffer.from(bech32.fromWords(words)).toString("hex")}`
  );
};
