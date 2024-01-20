// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { getChain } from "./get-chain";
import { Address } from "helpers/src/crypto/addresses/types";

export const getChainByAddress = (address: Address) => {
  return getChain(address);
};
