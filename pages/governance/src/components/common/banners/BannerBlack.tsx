// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { ExternalLinkIcon } from "icons";

import { CLICK_COMMONWEALTH_OUTLINK } from "tracker";
import { TrackerEvent } from "@evmosapps/ui-helpers";
import { useAccount } from "wagmi";

const BannerBlack = ({ text, href }: { text: string; href: string }) => {
  const { address, connector } = useAccount();
  return (
    <TrackerEvent
      event={CLICK_COMMONWEALTH_OUTLINK}
      properties={{
        "User Wallet Address": address,
        "Wallet Provider": connector?.name,
      }}
    >
      <Link rel="noopener noreferrer" target="_blank" href={href}>
        <div className="text-base mx-4 my-4 flex items-center justify-between rounded-2xl border-4 border-darkGray2 bg-black p-5 font-bold text-pearl md:mx-0">
          <span>{text}</span>
          <ExternalLinkIcon className="shrink-0" width={20} height={20} />
        </div>
      </Link>
    </TrackerEvent>
  );
  //
};

export default BannerBlack;
