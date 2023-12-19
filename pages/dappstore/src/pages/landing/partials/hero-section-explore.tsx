// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import { Trans } from "@evmosapps/i18n/client";
import { ButtonWithLink, TrackerEvent } from "@evmosapps/ui-helpers";
import { CLICK_ON_VIEW_ALL_DAPPS } from "tracker";
import { translation } from "@evmosapps/i18n/server";

export const HeroSectionExplore = async ({
  totalApps,
}: {
  totalApps: number;
}) => {
  const { t } = await translation("dappStore");

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[url(/apps-bg.png)] bg-cover bg-center bg-no-repeat font-evmos text-4xl space-y-4 text-pearl">
      <Trans
        ns="dappStore"
        shouldUnescape={true}
        i18nKey="ecosystem.explore"
        components={{
          div: <div className="" />,
        }}
        values={{
          count: totalApps,
        }}
      />
      <TrackerEvent
        event={CLICK_ON_VIEW_ALL_DAPPS}
        properties={{ Location: "Graphic" }}
      >
        <ButtonWithLink
          href="/dapps"
          className="flex self-center bg-[#A4A189CC] font-brand px-11"
          aria-label="view all dapps"
        >
          {t("ecosystem.button.text")}
          {t("ecosystem.button.text2")}
        </ButtonWithLink>
      </TrackerEvent>
    </div>
  );
};
