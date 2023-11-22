// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ADD_DAPP_FORM_URL, DOCS_EVMOS_REVENUE } from "constants-helper";
import Image from "next/image";
import { Frameline, PrimaryButton } from "@evmosapps/ui-helpers";
import { translation } from "@evmosapps/i18n/server";

export const HeroSection = async () => {
  const { t } = await translation("dappStore");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 space-x-0 md:space-x-8">
      <div
        className="w-full bg-cover bg-no-repeat flex flex-col space-y-8 p-5 "
        style={{
          backgroundImage: `url(/ecosystem/galaxy.png)`,
        }}
      >
        {/* TODO: add localization */}
        <h1
          className="font-evmos font-bold text-5xl tracking-wide text-pearl"
          style={{ fontFeatureSettings: "'ss02' on, 'ss01' on" }}
        >
          {t("ecosystem.title")} <br /> {t("ecosystem.title2")}
        </h1>
        <p className="border-b border-t border-pearl border-opacity-40 py-2 text-sm  text-pearl w-fit">
          {t("ecosystem.description")}
        </p>
        <div className="flex flex-col md:flex-row items-center space-x-0 space-y-4 md:space-y-0 md:space-x-2 w-full xl:w-[80%] 2xl:w-[61%]">
          <PrimaryButton
            className="flex-1 font-normal rounded w-full self-stretch"
            as={"a"}
            href={ADD_DAPP_FORM_URL}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            {t("ecosystem.addAppButton")}
          </PrimaryButton>
          <PrimaryButton
            as={"a"}
            className="flex-1 font-normal rounded w-full"
            variant="secondary"
            href={DOCS_EVMOS_REVENUE}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            {t("ecosystem.revenueButton")}
          </PrimaryButton>
        </div>
      </div>
      <div className="hidden md:grid">
        <Frameline variant="secondary">
          <div
            className="h-full flex items-center justify-center relative 
        before:content-[''] before:absolute before:top-[50%] before:left-0 
        before:-translate-y-1/2 before:w-[20px] before:h-[20px] before:animate-pulse before:bg-[#9F05FE] before:rounded-full"
          >
            <Image
              src="/ecosystem/hero-img.svg"
              alt="hero-img"
              width={250}
              height={150}
              className="object-contain"
            />
          </div>
        </Frameline>
      </div>
    </div>
  );
};
