"use server";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";

import { Badge, TrackerEvent } from "ui-helpers";

import { CLICK_ON_FEATURED_DAPP } from "tracker";

import { EcosystemProps } from "../../data";
import { Link } from "@evmosapps/i18n/client";

export const EcosystemCard = ({ data }: { data: EcosystemProps }) => {
  return (
    <TrackerEvent
      event={CLICK_ON_FEATURED_DAPP}
      properties={{ featured: data.name }}
    >
      <Link
        href={`/dapps/${data.categorySlug}/${data.slug}`}
        key={data.name}
        className="relative mb-16 space-y-2 rounded-lg bg-[#262017] pb-8 transition-all duration-150 ease-out hover:scale-105"
      >
        <Image
          src={data.image}
          alt={data.name}
          width={250}
          height={150}
          className="aspect-[3/2] w-full rounded-t-2xl object-cover"
        />
        <div className="flex space-x-3 items-center px-5 pt-5">
          <h3 className="text-sm font-bold text-pearl">{data.name}</h3>
          <Badge className="text-sm space-x-2">
            {/* TODO: check if we need to create a component for this */}
            {/* TODO: add color to tailwind file */}
            <span className="w-[8px] h-[8px] bg-[#AE00FF] rounded-full" />
            <p>{data.category}</p>
          </Badge>
        </div>
        <p className="px-5 text-sm text-white opacity-70">{data.description}</p>
      </Link>
    </TrackerEvent>
  );
};
