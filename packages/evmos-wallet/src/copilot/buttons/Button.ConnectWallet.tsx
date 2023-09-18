// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";
import { Dispatch, SetStateAction } from "react";
import { CLICK_CONNECT_WALLET_BUTTON, useTracker } from "tracker";
import { PrimaryButton } from "ui-helpers";

export const ButtonConnectWallet = ({
  setShow,
  variant,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
  variant: "primary" | "outline-primary";
}) => {
  const { handlePreClickAction: trackClickConnectWallet } = useTracker(
    CLICK_CONNECT_WALLET_BUTTON
  );
  return (
    <PrimaryButton
      variant={variant}
      onClick={() => {
        setShow(true);
        trackClickConnectWallet();
      }}
      className={cn("", {
        "w-full text-lg": variant === "outline-primary",
        "rounded-full px-10 py-2": variant === "primary",
      })}
    >
      Connect
    </PrimaryButton>
  );
};
