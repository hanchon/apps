"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Card } from "../card/Card";
import { Description } from "../card/Description";
import { Title } from "../card/Title";
import { useTranslation } from "@evmosapps/i18n/client";

import { CLICK_ON_SEE_PORTFOLIO } from "tracker";
import { ButtonWithLink, TrackerEvent } from "ui-helpers";

export const AssetsCard = () => {
  const { t } = useTranslation("dappStore");

  return (
    <Card>
      <>
        <div>
          <Title firstWord={"Evmos"} secondWord={t("card.assets.title")} />
          <Description text={t("card.assets.description")} />
        </div>
        <TrackerEvent event={CLICK_ON_SEE_PORTFOLIO}>
          <ButtonWithLink href="/portfolio">
            {t("card.assets.button.text")}
          </ButtonWithLink>
        </TrackerEvent>
      </>
    </Card>
  );
};
