"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ConnectionRequired } from "@evmosapps/ui-helpers";
import { useAccount } from "wagmi";
import Stride from "@evmosapps/widgets/src/Stride/Stride";
import { ConnectButton } from "stateful-components/src/connect-button";
export default function StrideInstantDapp() {
  const { isDisconnected } = useAccount();

  if (isDisconnected) {
    return (
      <ConnectionRequired
        bgUrl="bg-[url(/ecosystem/blur/stride-blur.png)]"
        dappName="Stride"
      >
        <ConnectButton />
      </ConnectionRequired>
    );
  }
  return <Stride />;
}
