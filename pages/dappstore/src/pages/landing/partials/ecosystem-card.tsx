"use server";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";

import { Badge, TrackerEvent } from "ui-helpers";

import { CLICK_ON_FEATURED_DAPP } from "tracker";

import { Link } from "@evmosapps/i18n/client";
import { UpRightArrowIcon } from "icons";
import { DApp } from "../../../lib/fetch-explorer-data";

export const EcosystemCard = ({ data }: { data: DApp }) => {
  const imgId = data.cover?.id ?? data.icon?.id;

  return (
    <TrackerEvent
      event={CLICK_ON_FEATURED_DAPP}
      properties={{ featured: data.name }}
    >
      <Link
        href={
          data.instantDapp
            ? `/dapps/${data.categorySlug}/${data.slug}`
            : data.app ?? ""
        }
        target={data.instantDapp ? "" : "_blank"}
        key={data.name}
        className="relative mb-16 space-y-2 rounded-lg bg-[#262017] pb-8 transition-all duration-150 ease-out hover:scale-105"
      >
        <div className="aspect-[3/2] w-full rounded-t-2xl object-cover bg-white/5 relative overflow-hidden">
          {imgId && (
            <Image
              className="object-cover"
              src={`/external-image/${imgId}`}
              alt={data.name}
              fill={true}
            />
          )}
        </div>
        <div className="flex space-x-3 items-center px-5 pt-5">
          <h3 className="text-sm font-bold text-pearl">{data.name}</h3>
          {data.instantDapp ? (
            <Badge className="text-sm space-x-2 ">
              {/* TODO: check if we need to create a component for this */}
              {/* TODO: add color to tailwind file */}
              <span className="w-[8px] h-[8px] bg-[#AE00FF] rounded-full" />
              <p>{data.categoryName}</p>
            </Badge>
          ) : (
            <div className="rounded-full h-6 w-6 flex justify-center items-center border border-[#FFF4E173]">
              <UpRightArrowIcon className="h-2 w-2" />
            </div>
          )}
        </div>
        <p className="px-5 text-sm text-white opacity-70">{data.description}</p>
      </Link>
    </TrackerEvent>
  );
};
