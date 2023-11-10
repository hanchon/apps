"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Card } from "../card/Card";
import { Description } from "../card/Description";
import { Title } from "../card/Title";
import { useTranslation } from "@evmosapps/i18n/client";

import { CLICK_ON_PARTICIPATE_IN_GOVERNANCE } from "tracker";
import { ButtonWithLink, TrackerEvent } from "ui-helpers";

export const GovernanceCard = () => {
  const { t } = useTranslation("dappStore");
  return (
    <Card>
      <div>
        <Title firstWord={"Evmos"} secondWord={t("card.governance.title")} />
        <Description text={t("card.governance.description")} />
      </div>
      <TrackerEvent event={CLICK_ON_PARTICIPATE_IN_GOVERNANCE}>
        <ButtonWithLink href="/governance">
          {t("card.governance.button.text")}
        </ButtonWithLink>
      </TrackerEvent>
    </Card>
  );
};
