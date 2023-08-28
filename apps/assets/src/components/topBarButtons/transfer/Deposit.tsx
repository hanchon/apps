// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useTranslation } from "next-i18next";
import { WizardHelper } from "ui-helpers";

export const Deposit = () => {
  // TODO: add logic for deposit
  const { t } = useTranslation();
  return (
    <section>
      <WizardHelper>
        <p>
          {t("transfer.deposit.helper.description")}
          <b>{t("transfer.deposit.helper.description2")}</b>
          {t("transfer.deposit.helper.description3")}
        </p>
      </WizardHelper>
    </section>
  );
};
