// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { IntroductionModal, ModalContainer } from "ui-helpers";
import { AccountInformation } from "../common/AccountInformation";
import { Content } from "./Content";
import { useTranslation } from "next-i18next";

export const PayModal = () => {
  const { t } = useTranslation();
  return (
    <ModalContainer
      introduction={
        <IntroductionModal
          title={t("pay.modal.title")}
          description={t("pay.modal.description")}
          content={<AccountInformation />}
        />
      }
      content={<Content />}
    />
  );
};
