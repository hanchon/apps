// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ChainEntity } from "@evmosapps/registry/autogen/chain-entity";

export const loadRegistryChainExtensions = async () => {
  const chains: Record<string, unknown> = await import(
    "@evmosapps/registry/src/extend-registry/chains"
  );
  return Object.values(chains) as ChainEntity[];
};
