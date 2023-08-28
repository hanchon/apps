// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { DownloadIcon, RightArrowIcon } from "icons";
import { useState } from "react";
import { DepositContainer } from "./DepositContainer";
import { Subtitle, Tabs } from "ui-helpers";
import { TRANSFER_TYPES } from "./utils";
import { useTranslation } from "next-i18next";

export const Content = () => {
  const [transferType, setTransferType] = useState(TRANSFER_TYPES.DEPOSIT);
  const { t } = useTranslation();

  function renderScreen() {
    if (transferType === TRANSFER_TYPES.DEPOSIT) {
      return <DepositContainer />;
    }

    return <>{/* TODO: add logic for send */}</>;
  }

  const transferTabs = [
    {
      onClick: () => setTransferType(TRANSFER_TYPES.DEPOSIT),
      icon: <DownloadIcon />,
      text: TRANSFER_TYPES.DEPOSIT,
      option: transferType,
      type: TRANSFER_TYPES.DEPOSIT,
    },
    {
      onClick: () => setTransferType(TRANSFER_TYPES.SEND),
      icon: <RightArrowIcon />,
      text: TRANSFER_TYPES.SEND,
      option: transferType,
      type: TRANSFER_TYPES.SEND,
    },
  ];

  return (
    <section className="space-y-3">
      <Subtitle>{t("transfer.subtitle")}</Subtitle>
      <Tabs tabsProps={transferTabs} />
      <div className="pt-7">{renderScreen()}</div>
    </section>
  );
};
