// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import { STRIDE_URL, FORGE_URL, TASHI_URL } from "constants-helper";

export type EcosystemProps = {
  image: string;
  name: string;
  type: string;
  description: string;
  href: string;
};

export const ecosystemData = [
  {
    image: "/ecosystem/forge.png",
    name: "Forge",
    type: "Instant dApp",
    description:
      "Swap, earn, and build on the premier Evmos community owned DEX.",
    href: FORGE_URL,
  },
  {
    image: "/ecosystem/stride.png",
    name: "Stride",
    type: "Instant dApp",
    description: "Liquid staking for Cosmos blockchains.",
    href: STRIDE_URL,
  },
  {
    image: "/ecosystem/galaxy.png",
    name: "Squid",
    type: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
  },
  {
    image: "/ecosystem/galaxy.png",
    name: "Wormhole",
    type: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
  },
  {
    image: "/ecosystem/galaxy.png",
    name: "Layerswap",
    type: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
  },
  {
    image: "/ecosystem/galaxy.png",
    name: "Cypher Wallet",
    type: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
  },
];
