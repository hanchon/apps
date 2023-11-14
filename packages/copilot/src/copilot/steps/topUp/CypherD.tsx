// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ContainerApp } from "./ContainerApp";
import { CypherD } from "@evmosapps/instant-dapps";
export default function CypherDLocal() {
  return (
    <ContainerApp>
      <CypherD />
    </ContainerApp>
  );
}
