"use client";
import { ConnectionRequired } from "@evmosapps/ui-helpers";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Forge from "@evmosapps/widgets/src/forge";
import { ConnectButton } from "stateful-components/src/connect-button";
import { useAccount } from "wagmi";

export default function ForgeInstantDapp() {
  const { isDisconnected } = useAccount();

  if (isDisconnected) {
    return (
      <ConnectionRequired
        bgUrl="bg-[url(/ecosystem/blur/forge-blur.png)]"
        dappName="Forge"
      >
        <ConnectButton />
      </ConnectionRequired>
    );
  }
  return <Forge />;
}
