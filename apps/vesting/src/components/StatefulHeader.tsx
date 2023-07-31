// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StoreType, WalletConnection } from "evmos-wallet";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "ui-helpers";
import { Dispatch, SetStateAction } from "react";
import { useTracker, CLICK_EVMOS_LOGO } from "tracker";
import { Copilot, CopilotButton, StepsContextProvider } from "copilot";

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
  return (
    <StepsContextProvider>
      <>
        <Copilot />
        <Header
          pageName={pageName}
          setShowSidebar={setShowSidebar}
          walletConnectionButton={
            <WalletConnection
              copilotModal={({
                beforeStartHook,
              }: {
                beforeStartHook: Dispatch<SetStateAction<boolean>>;
              }) => <CopilotButton beforeStartHook={beforeStartHook} />}
              dispatch={dispatch}
              walletExtension={wallet}
            />
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
    </StepsContextProvider>
  );
};