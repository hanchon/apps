"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StakingCard } from "./staking/Card";
import { AssetsCard } from "./assets/Card";
import { GovernanceCard } from "./governance/Card";
import { EcosystemContainer } from "./ecosystem/Container";
import { AccountBalance } from "./accountBalance/AccountBalance";
import { CopilotCard } from "copilot";
import { Title } from "ui-helpers/src/titles/Title";
import { Subtitle } from "ui-helpers/src/titles/Subtitle";
import { HeroSection } from "./HeroSection";
import { Button } from "./Button";
import { Frameline } from "ui-helpers";

export const ContentDappStore = () => {
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
      <EcosystemContainer />
      <Frameline>
        {/* TODO: className as prop to give w-full */}
        <Button className="w-full" onClick={() => {}}>
          See all amount dApps
        </Button>
      </Frameline>
    </div>
  );
};
