// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import { STRIDE_URL, FORGE_URL } from "constants-helper";

export const ecosystemData = [
  {
    image: "/ecosystem/forge.png",
    name: "Forge",
    category: "Instant dApp",
    description:
      "Swap, earn, and build on the premier Evmos community owned DEX.",
    href: FORGE_URL,
  },
  {
    image: "/ecosystem/stride.png",
    name: "Stride",
    category: "Instant dApp",
    description: "Liquid staking for Cosmos blockchains.",
    href: STRIDE_URL,
  },
  {
    image: "/ecosystem/galaxy.png",
    name: "Squid",
    category: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
  },
  {
    image: "/ecosystem/galaxy.png",
    name: "Wormhole",
    category: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
  },
  {
    image: "/ecosystem/galaxy.png",
    name: "Layerswap",
    category: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
  },
  {
    image: "/ecosystem/galaxy.png",
    name: "Cypher Wallet",
    category: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
  },
];

export type EcosystemProps = (typeof ecosystemData)[number];
