// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { PrimaryButton, TopBarContainer, TopBarItem } from "ui-helpers";
import { TopBarProps } from "./types";

import { useAccount } from "wagmi";
import { RequestIcon, SendIcon } from "icons";
import { useTranslation } from "next-i18next";
import { useTransferModal } from "../../../topBarButtons/transfer/TransferModal";
import { useRequestModal } from "../../../topBarButtons/request/RequestModal";
import {
  CLICK_ON_RECEIVE_BUTTON,
  CLICK_ON_SEND_BUTTON,
  useTracker,
} from "tracker";

const TopBar = ({ topProps }: { topProps: TopBarProps }) => {
  const { isDisconnected } = useAccount();
  const { t } = useTranslation();
  const transferModal = useTransferModal();
  const requestModal = useRequestModal();
  const { sendEvent } = useTracker();
  return (
    <TopBarContainer>
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
        <PrimaryButton
          disabled={isDisconnected}
          icon={<SendIcon />}
          onClick={() => {
            transferModal.setIsOpen(true);
            sendEvent(CLICK_ON_SEND_BUTTON);
          }}
        >
          <p>{t("transfer.button")}</p>
        </PrimaryButton>
        <PrimaryButton
          disabled={isDisconnected}
          icon={<RequestIcon />}
          onClick={() => {
            requestModal.setIsOpen(true);
            sendEvent(CLICK_ON_RECEIVE_BUTTON);
          }}
        >
          <p>{t("request.button")}</p>
        </PrimaryButton>
      </div>
    </TopBarContainer>
  );
};

export default TopBar;
