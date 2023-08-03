// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { Dispatch, SetStateAction, useCallback } from "react";
import { Logo, LaunchIcon } from "icons";
import { EVMOS_PAGE_URL } from "constants-helper";
export const Header = ({
  pageName,
  setShowSidebar,
  walletConnectionButton,
  onClick,
}: {
  pageName: string;
  setShowSidebar?: Dispatch<SetStateAction<boolean>>;
  walletConnectionButton?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) => {
  return (
    <div className="text-pearl mx-5 mb-3 flex flex-col xl:mx-0 xl:h-32 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-center justify-between xl:justify-start">
        <Link
          href={EVMOS_PAGE_URL}
          rel="noreferrer"
          className="flex items-center space-x-3 xl:pr-14"
          aria-label="home"
          onClick={onClick}
        >
          <Logo className="h-20 w-32 xl:w-36" />{" "}
          <span className="text-red text-2xl font-bold">Apps</span>
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        {/* TODO: add logic */}

        <div className="border-darGray800 bg-darGray800 flex  items-center justify-center rounded-full border p-2">
          <LaunchIcon width={30} height={30} />
        </div>
        {walletConnectionButton}
      </div>
    </div>
  );
};
