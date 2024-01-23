// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { getChainId, switchChain } from "wagmi/actions";
import { wagmiConfig } from "..";
import { getConnectedChainId } from "./getConnectedChainId";

export const switchToEvmosChain = async () => {
  const connectedChainId = await getConnectedChainId();

  if (connectedChainId !== getChainId(wagmiConfig)) {
    return switchChain(wagmiConfig, {
      chainId: getChainId(wagmiConfig),
    });
  }
};
