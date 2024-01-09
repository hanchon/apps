// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { LeapIcon, RabbyIcon } from "icons";
import { ButtonWallet } from "./ConnectModalContent";
import { Badge } from "@evmosapps/ui-helpers";

export const ComingSoonWallets = () => {
  return (
    <div className="flex flex-col space-y-3">
      <ButtonWallet className="flex w-full" disabled={true}>
        <LeapIcon className="w-7" />
        <span className="grow flex">Leap</span>

        <Badge variant="danger">Coming soon</Badge>
      </ButtonWallet>

      <ButtonWallet className="flex w-full" disabled={true}>
        <RabbyIcon className="w-7" />
        <span className="grow flex">Rabby</span>

        <Badge variant="danger">Coming soon</Badge>
      </ButtonWallet>
    </div>
  );
};
