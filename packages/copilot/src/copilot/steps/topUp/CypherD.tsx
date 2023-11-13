// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ContainerApp } from "./ContainerApp";
import { CypherDIFrame } from "./CypherDIframe";

export default function CypherD() {
  return (
    <ContainerApp>
      <CypherDIFrame />
    </ContainerApp>
  );
}
