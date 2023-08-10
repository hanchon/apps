// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ECOSYSTEM_URL, STAKING_URL } from "constants-helper";
import { Button } from "./Button";
import {
  CLICK_ON_STAKE_COPILOT_BANNER,
  CLICK_ON_USE_DAPP_COPILOT_BANNER,
  useTracker,
} from "tracker";

export const NextStepsActionsDapp = ({ status }: { status: string }) => {
  const { handlePreClickAction: clickStake } = useTracker(
    CLICK_ON_STAKE_COPILOT_BANNER
  );
  const { handlePreClickAction: clickDapp } = useTracker(
    CLICK_ON_USE_DAPP_COPILOT_BANNER
  );

  const handleStakeClick = () => {
    console.log("asd");
    clickStake();
    window.open(STAKING_URL);
  };

  const handleUseDappClick = () => {
    clickDapp();
    window.open(ECOSYSTEM_URL);
  };
  return (
    <div className="flex items-center space-x-4">
      <Button text="Stake" onClick={handleStakeClick} status={status} />
      <Button
        onClick={handleUseDappClick}
        text="Use a dApp"
        className="text-pearl bg-[#FAF1E442]"
        status={status}
      />
    </div>
  );
};
