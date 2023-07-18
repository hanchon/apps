// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { WalletConnection, StoreType } from "evmos-wallet";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "ui-helpers";
import { Dispatch, SetStateAction } from "react";
import { CLICK_EVMOS_LOGO, useTracker } from "tracker";

import { StepsContextProvider } from "../copilot/container/StepsContext";
import { Copilot } from "../copilot/Copilot";

export const StatefulHeader = ({
  pageName,
  setShowSidebar,
}: {
  pageName: string;
  setShowSidebar?: Dispatch<SetStateAction<boolean>>;
}) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();

  const { handlePreClickAction } = useTracker(CLICK_EVMOS_LOGO);
  // TODO: delete show and button
  return (
    <>
      <StepsContextProvider>
        <Copilot />
      </StepsContextProvider>

      <Header
        pageName={pageName}
        setShowSidebar={setShowSidebar}
        walletConnectionButton={
          <WalletConnection dispatch={dispatch} walletExtension={wallet} />
        }
        onClick={() => {
          handlePreClickAction({
            wallet: wallet?.evmosAddressEthFormat,
            provider: wallet?.extensionName,
            page: pageName,
          });
        }}
      />
    </>
  );
};
