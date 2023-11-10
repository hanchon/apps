// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StakingCard } from "./partials/staking-card";
import { AssetsCard } from "./partials/assets-card";
import { GovernanceCard } from "./partials/governance-card";
import { EcosystemSection } from "./partials/ecosystem-section";
import { AccountBalance } from "./partials/account-balance";
import { CopilotCard } from "copilot";
import { Title } from "ui-helpers/src/titles/Title";
import { Subtitle } from "ui-helpers/src/titles/Subtitle";
import { HeroSection } from "./partials/hero-section";
import { ButtonWithLink, Frameline } from "ui-helpers";

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const LandingPage = () => {
  return (
    <div className="space-y-8 text-display">
      <div className="grid items-center gap-x-8 gap-y-11 md:grid-cols-2">
        <AccountBalance />
        <CopilotCard />
      </div>
      {/* TODO: add localization */}
      <div className="flex space-y-2 flex-col">
        <Title>Evmos dApps</Title>
        <Subtitle>The core dApps created by the Evmos Team</Subtitle>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <StakingCard />
        <div className="grid grid-rows-2 gap-y-8">
          <AssetsCard />
          <GovernanceCard />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 space-x-8">
        <HeroSection />
      </div>
      <EcosystemSection />
      <Frameline>
        <ButtonWithLink className="w-full " href="/dapps">
          See all amount dApps
        </ButtonWithLink>
      </Frameline>
    </div>
  );
};
