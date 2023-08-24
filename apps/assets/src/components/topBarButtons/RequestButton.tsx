// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { RequestIcon } from "icons";
import { PrimaryButton } from "ui-helpers";
import { useAccount } from "wagmi";

export const RequestButton = () => {
  const handleOnClick = () => {
    //  TODO: add logic
  };

  const { isDisconnected } = useAccount();
  return (
    <PrimaryButton
      disabled={isDisconnected}
      //   || wallet.extensionName === METAMASK_KEY ||
      //   wallet.extensionName === WALLECT_CONNECT_KEY

      // add i18
      text="Request"
      icon={<RequestIcon />}
      onClick={handleOnClick}
    />
  );
};
