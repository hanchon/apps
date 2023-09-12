// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useTranslation } from "next-i18next";
import { ErrorContainer, Input, Subtitle, InfoPanel } from "ui-helpers";

export const Deposit = () => {
  // TODO: add logic for deposit
  const { t } = useTranslation();
  return (
    <section className="space-y-3">
      <Subtitle>Account address of receipient </Subtitle>
      {/* TODO: add props */}
      <Input />
      <ErrorContainer
        text="Incompatible address"
        description="Deposit can only be made to evmos accounts."
      />

      <InfoPanel>
        <p>
          {t("transfer.deposit.helper.description")}
          <b>{t("transfer.deposit.helper.description2")}</b>
          {t("transfer.deposit.helper.description3")}
        </p>
      </InfoPanel>
    </section>
  );
};
