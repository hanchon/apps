// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { EvmosRedIcon, Logo } from "icons";
import { EVMOS_PAGE_URL } from "constants-helper";
import { LaunchContainer } from "./launchPad/Container";
export const Header = ({
  walletConnectionButton,
  onClick,
}: {
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
      <div className="flex flex-col items-center space-y-3 md:flex-row md:space-x-16 md:space-y-0">
        <div
          className="font-sm text-pearl bg-darGray800 flex
     items-center justify-center space-x-3 rounded-full px-10 py-2
      font-bold"
        >
          <EvmosRedIcon width={"20"} height={"20"} />
          {/* TODO: add evmos price */}
          <span>-</span>
        </div>
        <div className="flex items-center space-x-3">
          <LaunchContainer />
          {walletConnectionButton}
        </div>
      </div>
    </div>
  );
};
