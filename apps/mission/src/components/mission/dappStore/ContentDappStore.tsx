// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StakingCard } from "./staking/Card";
import { AssetsCard } from "./assets/Card";
import { GovernanceCard } from "./governance/Card";
import { EcosystemContainer } from "./ecosystem/Container";
import { AccountBalanceContainer } from "./accountBalance/Container";
export const ContentDappStore = () => {
  return (
    <div className="space-y-8 px-3 text-[IBM] md:px-0">
      <div className="flex flex-col justify-between md:flex-row">
        <AccountBalanceContainer />
      </div>
      <div className="grid gap-8 md:grid-cols-2 ">
        <StakingCard />
        <div className="grid grid-rows-2 gap-y-8">
          <AssetsCard /> <GovernanceCard />
        </div>
      </div>
      <EcosystemContainer />
    </div>
  );
};
