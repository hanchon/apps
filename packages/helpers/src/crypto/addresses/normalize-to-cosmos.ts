// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { isHex } from "viem/utils";
import { ethToEvmos } from "./eth-to-evmos";
import { CosmosAddress } from "./types";

/**
 * Normalizes an address to a Cosmo address.
 * @param address - The address to normalize.
 * @returns The normalized Cosmos address
 */

export const normalizeToCosmos = (address: string): CosmosAddress => {
  if (isHex(address)) {
    return ethToEvmos(address);
  }
  return address as CosmosAddress;
};
