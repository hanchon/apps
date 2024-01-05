"use client";

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import C14 from "@evmosapps/widgets/src/C14";
import { InstantDappContainer } from "./instant-dapp-container";

export default function C14InstantDapp() {
  return (
    <InstantDappContainer
      image="bg-[url(/ecosystem/blur/C14-blur.png)]"
      dappName="C14"
      widget={<C14 />}
    />
  );
}
