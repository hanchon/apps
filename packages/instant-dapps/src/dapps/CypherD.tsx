"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useAccount } from "wagmi";
import { ConnectionRequired } from "@evmosapps/ui-helpers";
import CypherD from "@evmosapps/widgets/src/cypherd";
import { ConnectButton } from "stateful-components/src/connect-button";

const CypherDInstantDapp = () => {
  const { isDisconnected } = useAccount();
  if (isDisconnected) {
    return (
      <ConnectionRequired
        bgUrl="bg-[url(/ecosystem/blur/cypher-blur.png)]"
        dappName="Cypher Wallet"
      >
        <ConnectButton />
      </ConnectionRequired>
    );
  }
  return <CypherD />;
};

export default CypherDInstantDapp;
