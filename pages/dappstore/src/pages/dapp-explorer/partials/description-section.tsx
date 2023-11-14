"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";
import { Badge, ButtonWithLink, Frameline } from "ui-helpers";
import { Title } from "ui-helpers/src/titles/Title";
import Link from "next/link";
import {
  DiscordIcon,
  GithubIcon,
  RightArrow,
  TwitterIcon,
  WebsiteIcon,
} from "icons";
import { HeroSection } from "../../landing/partials/hero-section";
import { DescriptionItem } from "./description-item";
import { DApp } from "../../../lib/fetch-explorer-data";
// import { CypherD } from "@evmosapps/instant-dapps/src/dapps/CypherD";
// import Transak from "@evmosapps/instant-dapps/src/dapps/Transak";
// import C14 from "@evmosapps/instant-dapps/src/dapps/C14";
import LayerSwap from "@evmosapps/instant-dapps/src/dapps/Layerswap";
export const DescriptiondApp = ({ dapp }: { dapp: DApp }) => {
  const imgId = dapp.cover?.id ?? dapp.icon?.id;

  return (
    <div className="space-y-24 pb-24">
      <div className="font-brand relative">
        <Image
          // TODO: use dapp image
          src={"/ecosystem/galaxy.png"}
          alt={dapp.name}
          width={1000}
          height={250}
          className="w-full h-[250px]"
        />

        <div className="flex flex-col absolute left-20 -bottom-14">
          <Image
            src={`/external-image/${imgId}`}
            alt={dapp.name}
            width={500}
            height={250}
            className="w-48 z-10 self-center flex"
          />
        </div>
        <div className="absolute left-72 bottom-3">
          <p className="text-[#E8DFD3] text-7xl flex ">{dapp.name}</p>
        </div>

        <div className="absolute left-72 -bottom-10">
          <p className="text-[#D3CBC7] text-xl font-light">
            {dapp.shortDescription}
          </p>
        </div>

        {dapp.instantDapp && (
          <div className="flex flex-col  absolute right-20 bottom-6">
            {/* TODO: check if we need to create a component for this */}
            {/* TODO: add color to tailwind file */}
            <Badge className="text-sm space-x-2 border border-[#FFF4E173] text-xl px-5 py-2">
              {/* TODO: check if we need to create a component for this */}
              {/* TODO: add color to tailwind file */}
              <span className="w-[13px] h-[13px] bg-[#AE00FF] rounded-full" />
              <p>Instant dApp</p>
            </Badge>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3">
        <div className="space-y-24 col-span-2">
          <DescriptionItem title={`How to use ${dapp.name} Instant dApp`}>
            <p>{dapp.description}</p>
          </DescriptionItem>
          <DescriptionItem title="Social">
            {dapp.twitter && (
              <Link
                href={dapp.twitter}
                className="flex flex-row space-x-2 items-center "
              >
                <TwitterIcon width={20} height={20} /> <p>{dapp.name}</p>
              </Link>
            )}
            {dapp.discord && (
              <Link
                href={dapp.discord}
                className="flex flex-row space-x-2 items-center "
              >
                <DiscordIcon width={20} height={20} /> <p>{dapp.name}</p>
              </Link>
            )}
            {/* TODO: add telegram */}
            {/* {dapp.links.telegram !== undefined && (
              <Link
                href={dapp.links.telegram}
                className="flex flex-row space-x-2 items-center "
              >
                <TelegramIcon width={20} height={20} /> <p>{dapp.name}</p>
              </Link>
            )} */}
          </DescriptionItem>

          <DescriptionItem title="Contact Details">
            {dapp.github && (
              <Link
                href={dapp.github}
                className="flex flex-row space-x-2 items-center "
              >
                <GithubIcon width={20} height={20} /> <p>Github</p>
              </Link>
            )}
            {/* TODO: add documentation */}
            {/* {dapp.documentation && (
              <Link
                href={dapp.documentation}
                className="flex flex-row space-x-2 items-center "
              >
                <DocumentationIcon width={20} height={20} /> <p>Documentation</p>
              </Link>
            )} */}
          </DescriptionItem>

          <DescriptionItem title="Website">
            {/* {dapp.links.website && ( */}
            <Link href="/" className="flex flex-row space-x-2 items-center ">
              <WebsiteIcon width={20} height={20} /> <p>url</p>
            </Link>
            {/* )} */}
          </DescriptionItem>
        </div>
        <Frameline variant="secondary">
          <div className="flex items-center justify-center h-full">
            {/* TODO: add iframes */}
            <LayerSwap />
          </div>
        </Frameline>
      </div>
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
        <Title>Related dApps</Title>
        <ButtonWithLink href="/dapps" className="self-center">
          <div className="flex items-center space-x-2">
            <p>See More</p>
            <RightArrow width={11} height={11} />
          </div>
        </ButtonWithLink>
      </div>
      {/* display related apps */}

      <HeroSection />
    </div>
  );
};
