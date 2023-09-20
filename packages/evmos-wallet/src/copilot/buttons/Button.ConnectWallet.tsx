// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { CLICK_CONNECT_WALLET_BUTTON, useTracker } from "tracker";
import { PrimaryButton } from "ui-helpers";

export const ButtonConnectWallet = ({
  setShow,
  variant,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
  variant: "primary" | "outline-primary" | "primary-lg";
}) => {
  const { query } = useRouter();

  const { sendEvent } = useTracker(CLICK_CONNECT_WALLET_BUTTON);

  return (
    <PrimaryButton
      variant={variant}
      onClick={() => {
        setShow(true);
        sendEvent(CLICK_CONNECT_WALLET_BUTTON, {
          location: query.action
            ? query.action === "transfer"
              ? "send modal"
              : query.action === "pay"
              ? "payment request modal"
              : "receive modal"
            : "dApp Store",
        });
      }}
      className={cn("", {
        "w-full text-lg": variant === "outline-primary" || "primary-lg",
        "rounded-full px-10 py-2": variant === "primary",
      })}
    >
      Connect
    </PrimaryButton>
  );
};
