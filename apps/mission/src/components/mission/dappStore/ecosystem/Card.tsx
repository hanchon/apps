// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";
import { EcosystemProps } from "./ecosystemData";
import { Badge } from "ui-helpers";
import Link from "next/link";
import { CLICK_ON_FEATURED_DAPP, useTracker } from "tracker";
export const EcosystemCard = ({ data }: { data: EcosystemProps }) => {
  const { handlePreClickAction } = useTracker(CLICK_ON_FEATURED_DAPP);

  const handleClick = () => {
    handlePreClickAction({ featured: data.name });
  };
  return (
    <Link
      onClick={handleClick}
      href={data.href}
      key={data.name}
      rel="noopener noreferrer"
      target="_blank"
      className="relative space-y-5 rounded-lg bg-[#262017] pb-8"
    >
      <Image
        className=" aspect-[3/2] w-full rounded-2xl object-contain"
        src={data.image}
        alt={data.name}
        width={250}
        height={150}
      />
      <div className="flex space-x-8 px-5">
        <h3 className=" text-sm font-bold text-pearl">{data.name}</h3>
        <Badge
          text={data.type}
          style="text-darkGray300 text-[8px] ring-darkGray300"
        />
      </div>
      <p className="px-5 text-sm text-white opacity-70">{data.description}</p>
    </Link>
  );
};
