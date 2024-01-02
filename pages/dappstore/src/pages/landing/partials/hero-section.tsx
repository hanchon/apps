// Copyright Tharsis Labs Ltd.(Evmos)

import { HeroSectionExplore } from "./hero-section-explore";
import { HeroSectionFrameline } from "./hero-section-frameline";

export const HeroSection = ({ totalApps }: { totalApps: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 space-x-0 md:space-x-8">
      <HeroSectionFrameline />
      <div className="hidden md:grid">
        <HeroSectionExplore totalApps={totalApps} />
      </div>
    </div>
  );
};
