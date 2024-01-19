// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { raise } from "helpers";
import { fetchChains } from "../fetch-chains";

export const fetchChainByRef = async (chainRef: string) => {
  const chains = await fetchChains();
  const chainInfo = chains.find((chainInfo) => chainInfo.ref === chainRef);

  return chainInfo ?? raise("chain not found");
};
