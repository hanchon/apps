// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext } from "react";
import { StepsContext } from "../container/StepsContext";
import { Button } from "./Button";
import { CLICK_ON_TOP_UP_ACCOUNT_DAPP, useTracker } from "tracker";

export const TopUpDapp = ({ status }: { status: string }) => {
  const { setShowModal } = useContext(StepsContext);
  const { handlePreClickAction } = useTracker(CLICK_ON_TOP_UP_ACCOUNT_DAPP);

  const handleClick = () => {
    handlePreClickAction({ location: "Inside Copilot onboarding banner" });
    setShowModal(true);
  };
  return <Button text="Top up account" onClick={handleClick} status={status} />;
};
