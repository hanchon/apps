"use client";

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useAccount } from "wagmi";
import { ConnectionRequired } from "@evmosapps/ui-helpers";
import Osmosis from "@evmosapps/widgets/src/Osmosis/Osmosis";
import { ConnectButton } from "stateful-components/src/connect-button";

export default function OsmosisInstantDapp() {
  const { isDisconnected } = useAccount();

  if (isDisconnected) {
    return (
      <ConnectionRequired
        bgUrl="bg-[url(/ecosystem/blur/osmosis-blur.png)]"
        dappName="Osmosis"
      >
        <ConnectButton />
      </ConnectionRequired>
    );
  }
  return <Osmosis />;
}
