// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";
import { Badge, ButtonWithLink, Frameline } from "@evmosapps/ui-helpers";
import { Title } from "@evmosapps/ui-helpers/src/titles/Title";
import Link from "next/link";
import {
  DiscordIcon,
  GithubIcon,
  RightArrow,
  TelegramIcon,
  TwitterIcon,
  WebsiteIcon,
} from "icons";
import { HeroSection } from "../../landing/partials/hero-section";
import { DescriptionItem } from "./description-item";
import { DApp } from "../../../lib/fetch-explorer-data";
import { cn } from "helpers";
import dynamic from "next/dynamic";
import { EcosystemCard } from "../../landing/partials/ecosystem-card";
import { translation } from "@evmosapps/i18n/server";
import { EcosystemCardGrid } from "../../landing/partials/ecosystem-card-grid";
const WIDGETS: {
  [key: string]: React.ComponentType<{}>;
} = {
  layerswap: dynamic(
    () => import("@evmosapps/instant-dapps/src/dapps/Layerswap"),
    {
      loading: () => <p>Loading...</p>,
    }
  ),
  squid: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/Squid"), {
    loading: () => <p>Loading...</p>,
  }),
  "cypher-wallet": dynamic(
    () => import("@evmosapps/instant-dapps/src/dapps/CypherD"),
    {
      loading: () => <p>Loading...</p>,
    }
  ),
  c14: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/C14"), {
    loading: () => <p>Loading...</p>,
  }),
  transak: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/Transak"), {
    loading: () => <p>Loading...</p>,
  }),
  wormhole: dynamic(
    () => import("@evmosapps/instant-dapps/src/dapps/Wormhole")
  ),
};

export const DescriptiondApp = async ({
  dapp,
  relatedApps,
}: {
  dapp: DApp;
  relatedApps: DApp[];
}) => {
  const { t } = await translation("dappStore");

  const drawWidget = () => {
    const Widget = WIDGETS[dapp.slug];
    if (Widget) return <Widget />;
  };

  return (
    <div className="space-y-12 lg:space-y-24 mb-12 lg:mb-24">
      <div className="relative">
        <div
          className={cn(
            "relative h-[300px] w-screen ml-[49%] -translate-x-1/2",
            // gradient overlay
            " after:bg-gradient-to-t after:from-black/70 after:to-transparent after:absolute after:w-full after:h-full after:bottom-0"
          )}
        >
          <Image
            src={dapp.cover ?? "/ecosystem/galaxy.png"}
            alt={dapp.name}
            fill={true}
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <header
          className={cn(
            "flex flex-col items-center -mt-24 gap-4",
            "md:flex-row md:items-stretch lg:gap-x-8"
          )}
        >
          <div
            className={cn(
              "relative shrink-0 w-32 aspect-square bg-[#423D37] rounded-md overflow-hidden",
              "md:w-48"
            )}
          >
            {dapp.icon && (
              <Image
                src={dapp.icon}
                alt={dapp.name}
                fill={true}
                className="object-cover"
                sizes={"400w"}
              />
            )}
          </div>
          <div
            className={cn(
              "relative text-center gap-8 flex flex-col max-w-xl",
              "md:text-left"
            )}
          >
            <h1 className="text-[#E8DFD3] text-3xl md:text-5xl lg:text-7xl">
              {dapp.name}
            </h1>
            <p className="text-[#D3CBC7] font-light lg:text-xl">
              {dapp.oneLiner}
            </p>
          </div>
          {dapp.instantDapp && (
            <div className="relative md:ml-auto shrink">
              {/* TODO: check if we need to create a component for this */}
              {/* TODO: add color to tailwind file */}
              <Badge className="text-sm space-x-2 border border-[#FFF4E173] whitespace-nowrap md:text-xl md:px-5 md:py-2">
                {/* TODO: check if we need to create a component for this */}
                {/* TODO: add color to tailwind file */}
                <span className="w-[13px] h-[13px] bg-[#AE00FF] rounded-full" />
                <p>{t("instantdApp.badge")}</p>
              </Badge>
            </div>
          )}
        </header>
      </div>
      <div className="flex flex-col lg:flex-row gap-y-12 lg:gap-y-24 gap-x-6 items-start">
        <div className="gap-y-12 lg:gap-y-24 w-full flex flex-col">
          {dapp.description && (
            <DescriptionItem
              title={t("instantdApp.description.title", {
                name: dapp.name,
              })}
            >
              <p>{dapp.description}</p>
            </DescriptionItem>
          )}
          {dapp.howTo && (
            <DescriptionItem
              title={t("instantdApp.howTo.title", {
                name: dapp.name,
              })}
            >
              <p>{dapp.howTo}</p>
            </DescriptionItem>
          )}

          <DescriptionItem title={t("instantdApp.social")}>
            {dapp.x && (
              <Link
                href={dapp.x}
                className="flex flex-row space-x-2 items-center"
                target="_blank"
              >
                <TwitterIcon width={20} height={20} /> <p>{dapp.name}</p>
              </Link>
            )}
            {dapp.discord && (
              <Link
                href={dapp.discord}
                className="flex flex-row space-x-2 items-center"
                target="_blank"
              >
                <DiscordIcon width={20} height={20} /> <p>{dapp.name}</p>
              </Link>
            )}

            {dapp.telegram && (
              <Link
                href={dapp.telegram}
                className="flex flex-row space-x-2 items-center"
                target="_blank"
              >
                <TelegramIcon width={20} height={20} /> <p>{dapp.name}</p>
              </Link>
            )}
          </DescriptionItem>

          <DescriptionItem title={t("instantdApp.information.title")}>
            {dapp.github && (
              <Link
                href={dapp.github}
                className="flex flex-row space-x-2 items-center"
                target="_blank"
              >
                <GithubIcon width={20} height={20} />{" "}
                <p>{t("instantdApp.information.options.github")}</p>
              </Link>
            )}
            {/* TODO: add documentation */}
            {/* {dapp.documentation && (
              <Link
                href={dapp.documentation}
                className="flex flex-row space-x-2 items-center"
                target="_blank"
              >
                <DocumentationIcon width={20} height={20} /> <p>Documentation</p>
              </Link>
            )} */}
          </DescriptionItem>

          <DescriptionItem title={t("instantdApp.website.title")}>
            <Link
              href="/"
              className="flex flex-row space-x-2 items-center"
              target="_blank"
            >
              <WebsiteIcon width={20} height={20} /> <p>url</p>
            </Link>
          </DescriptionItem>
        </div>
        <Frameline className="w-full max-w-lg mx-auto grow" variant="secondary">
          <div className="flex items-center justify-center h-full">
            {drawWidget()}
          </div>
        </Frameline>
      </div>

      <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
        <Title tag="h3">{t("instantdApp.relatedApps.title")}</Title>

        <ButtonWithLink href="/dapps" className="md:self-center">
          <div className="flex items-center space-x-2">
            <p>{t("instantdApp.relatedApps.button.text")}</p>
            <RightArrow width={11} height={11} />
          </div>
        </ButtonWithLink>
      </div>
      <EcosystemCardGrid>
        {relatedApps?.map((dApp) => (
          <EcosystemCard data={dApp} key={dApp.name} />
        ))}
      </EcosystemCardGrid>

      <HeroSection />
    </div>
  );
};
