// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import Evmosme from "@evmosapps/widgets/src/Evmosme/Evmosme";
import { InstantDappContainer } from "./instant-dapp-container";

export default function EvmosInstantDapp() {
  return (
    <InstantDappContainer
      image="bg-[url(/ecosystem/blur/osmosis-blur.png)]"
      dappName="Osmosis"
      widget={<Evmosme />}
    />
  );
}
