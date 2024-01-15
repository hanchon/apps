// Copyright Tharsis Labs Ltd.(Evmos)

import { HeroSectionExplore } from "./hero-section-explore";
import { HeroSectionFrameline } from "./hero-section-frameline";

export const HeroSection = ({ totalApps }: { totalApps: number }) => {
  return (
    <div className="grid md:grid-cols-2 gap-x-8">
      <div className="hidden md:grid ">
        <HeroSectionExplore totalApps={totalApps} />
      </div>
      <HeroSectionFrameline />
    </div>
  );
};
