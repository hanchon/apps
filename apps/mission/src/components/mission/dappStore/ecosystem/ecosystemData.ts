// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import { STRIDE_URL, FORGE_URL, TASHI_URL } from "constants-helper";
import galaxy from "../../../../../public/ecosystem/galaxy.png";
import tashi from "../../../../../public/ecosystem/tashi.svg";
import forge from "../../../../../public/ecosystem/forge.png";
import stride from "../../../../../public/ecosystem/stride.png";
export type EcosystemProps = {
  image: string;
  name: string;
  type: string;
  description: string;
  href: string;
};

export const ecosystemData = [
  {
    image: forge.src,
    name: "Forge",
    type: "Instant dApp",
    description:
      "Swap, earn, and build on the premier Evmos community owned DEX.",
    href: FORGE_URL,
  },
  {
    image: stride.src,
    name: "Stride",
    type: "Instant dApp",
    description: "Liquid staking for Cosmos blockchains.",
    href: STRIDE_URL,
  },
  {
    image: galaxy.src,
    name: "Squid",
    type: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
  },
  {
    image: tashi.src,
    name: "Tashi",
    type: "Instant dApp",
    description: "Tashi is your path to Borrow Lend DeFi on Evmos.",
    href: TASHI_URL,
  },
  {
    image: galaxy.src,
    name: "Wormhole",
    type: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
  },
  {
    image: galaxy.src,
    name: "Layerswap",
    type: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
  },
  {
    image: galaxy.src,
    name: "Cypher Wallet",
    type: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
  },
];
