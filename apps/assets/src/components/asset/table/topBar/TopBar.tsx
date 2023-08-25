// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TopBarContainer, TopBarItem } from "ui-helpers";
import { TopBarProps } from "./types";
import { TransferButton } from "../../../topBarButtons/transfer/TransferButton";
import { RequestButton } from "../../../topBarButtons/request/RequestButton";

const TopBar = ({ topProps }: { topProps: TopBarProps }) => {
  return (
    <TopBarContainer>
      <>
        <TopBarItem text="Total Assets" value={`$${topProps.totalAssets}`} />
        <TopBarItem
          text="EVMOS Price"
          value={
            topProps.evmosPrice === undefined
              ? "--"
              : `$${topProps.evmosPrice.toString()}`
          }
        />
        <div className="flex items-center justify-center space-x-2 lg:justify-end">
          <TransferButton />
          <RequestButton />
        </div>
      </>
    </TopBarContainer>
  );
};

export default TopBar;
