// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export type EcosystemProps = {
  image: string;
  name: string;
  type: string;
  description: string;
  href: string;
};
enum dAppsTypes {
  DEFI = "DEFI",
  NFT = "NFT",
  LIQUID_STAKING = "Liquid Staking",
}

export const ecosystemData = [
  {
    image: "/ecosystem/forge.png",
    name: "Forge",
    type: dAppsTypes.DEFI,
    description:
      "Swap, earn, and build on the premier Evmos community owned DEX.",
    href: "https://forge.trade/",
  },

  {
    image: "/ecosystem/tashi.png",
    name: "Tashi",
    type: dAppsTypes.DEFI,
    description: "Tashi is your path to Borrow Lend DeFi on Evmos.",
    href: "https://tashi.finance/",
  },
  {
    image: "/ecosystem/orbitalApes.png",
    name: "Orbital Apes",
    type: dAppsTypes.NFT,
    description:
      "The largest NFT Marketplace in Evmos. Built by the community, for the community.",
    href: "https://www.orbitalapes.com/",
  },
  {
    image: "/ecosystem/stride.png",
    name: "Stride",
    type: dAppsTypes.LIQUID_STAKING,
    description: "Liquid staking for Cosmos blockchains.",
    href: "https://app.stride.zone/",
  },
];
