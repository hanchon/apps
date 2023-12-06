// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ADD_DAPP_FORM_URL, DOCS_EVMOS_URL } from "constants-helper";
import {
  ButtonWithLink,
  Frameline,
  PrimaryButton,
  TrackerEvent,
} from "@evmosapps/ui-helpers";
import { translation } from "@evmosapps/i18n/server";
import { CLICK_EARN_REVENUE_BUTTON } from "tracker";
import { Trans } from "@evmosapps/i18n/client";
import { UpRightArrowIcon } from "icons";

export const HeroSection = async ({ totalApps }: { totalApps: number }) => {
  const { t } = await translation("dappStore");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 space-x-0 md:space-x-8">
      <Frameline>
        <div className="w-full flex flex-col space-y-8 py-5 px-0 md:px-16">
          <div className="flex flex-col font-evmos font-bold text-2xl md:text-[2.5em] tracking-wide text-pearl leading-none space-y-2">
            <h1 className="w-full">{t("ecosystem.title")}</h1>
            <div
              className="w-full relative before:content-[''] before:absolute before:top-[50%] before:left-0 
        before:-translate-y-1/2 before:w-[20px] before:h-[20px] before:animate-pulse before:bg-[#9F05FE] before:rounded-full"
            >
              <div className="flex items-center pl-10 space-x-5 ">
                <UpRightArrowIcon
                  width={20}
                  height={20}
                  strokeWidth={3}
                  className="text-[#A4A189]"
                />
                <UpRightArrowIcon
                  width={20}
                  height={20}
                  strokeWidth={3}
                  className="text-[#A4A189]"
                />
                <UpRightArrowIcon
                  width={20}
                  height={20}
                  strokeWidth={3}
                  className="text-[#A4A189]"
                />{" "}
                <span className=""> {t("ecosystem.title2")}</span>
              </div>
            </div>
          </div>
          <p className="border-b border-t border-pearl border-opacity-40 py-2 text-sm  text-pearl w-full">
            {t("ecosystem.description")}
          </p>
          <div className="flex flex-col md:flex-row items-center space-x-0 space-y-4 md:space-y-0 md:space-x-2 w-full">
            <PrimaryButton
              className="flex-1 font-normal rounded w-full self-stretch"
              as={"a"}
              href={ADD_DAPP_FORM_URL}
              target="_blank"
              referrerPolicy="no-referrer"
            >
              {t("ecosystem.addAppButton")}
            </PrimaryButton>
            <TrackerEvent event={CLICK_EARN_REVENUE_BUTTON}>
              <PrimaryButton
                as={"a"}
                className="flex-1 font-normal rounded w-full text-center text-sm"
                variant="secondary"
                href={DOCS_EVMOS_URL}
                target="_blank"
                referrerPolicy="no-referrer"
              >
                {t("ecosystem.buildButton")}
              </PrimaryButton>
            </TrackerEvent>
          </div>
        </div>
      </Frameline>
      <div className="hidden md:grid">
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

          <ButtonWithLink
            href="/dapps"
            className="flex self-center bg-[#A4A189CC] font-brand px-11"
          >
            {t("ecosystem.button.text")}
            {t("ecosystem.button.text2")}
          </ButtonWithLink>
        </div>
      </div>
    </div>
  );
};
