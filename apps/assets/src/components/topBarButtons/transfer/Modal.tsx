// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { IntroductionModal, ModalContainer } from "ui-helpers";
import { Content } from "./Content";
import { AccountInformation } from "../common/AccountInformation";
import { useTranslation } from "next-i18next";

export const TransferModal = () => {
  const { t } = useTranslation();
  return (
    <ModalContainer
      introduction={
        <IntroductionModal
          title={t("transfer.modal.title")}
          description={t("transfer.modal.description")}
          content={<AccountInformation />}
        />
      }
      content={<Content />}
    />
  );
};
