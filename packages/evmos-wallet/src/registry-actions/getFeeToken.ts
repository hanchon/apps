// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { getToken } from "./get-token";
import { getChain } from "./get-chain";

export const getFeeToken = (address: string) => {
  const { prefix, feeToken } = getChain(address);
  return getToken(prefix, feeToken)!;
};
