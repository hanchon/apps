// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ADD_DAPP_FORM_URL, DOCS_EVMOS_URL } from "constants-helper";
import { Frameline, PrimaryButton, TrackerEvent } from "@evmosapps/ui-helpers";
import { translation } from "@evmosapps/i18n/server";
import {
  CLICK_LEARN_BUTTON,
  CLICK_ON_APPLY_TO_BE_PART_OF_THE_ECOSYSTEM,
} from "tracker";

import { UpRightArrowIcon } from "icons";

export const HeroSectionFrameline = async () => {
  const { t } = await translation("dappStore");
  return (
    <Frameline variant="secondary">
      <div className="w-full flex flex-col space-y-8 py-5 px-0 lg:px-[4.2rem] xl-px-[5rem]">
        <div className="flex flex-col font-evmos font-light text-2xl lg:text-[2.5em] tracking-wide text-pearl leading-none space-y-2 ">
          <h1
            className="text-justify after:content-[''] -mb-5 sm:-mb-5 lg:-mb-10 after:inline-block after:w-full"
            style={{ wordSpacing: "-11px" }}
          >
            {t("ecosystem.title")}
          </h1>
          <div
            className="flex items-center justify-between relative before:content-[''] before:absolute before:top-[50%] before:left-0 
        before:-translate-y-1/2 before:w-[15px] before:h-[15px] before:md:w-[20px] before:md:h-[20px] before:animate-pulse before:bg-[#9F05FE] before:rounded-full"
          >
            <div className="pl-10 flex items-center space-x-6 md:space-x-10 ">
              <UpRightArrowIcon
                width={20}
                height={20}
                strokeWidth={4}
                className="text-[#A4A189] w-4 h-4 md:w-5 md:h-5"
              />
              <UpRightArrowIcon
                width={20}
                height={20}
                strokeWidth={4}
                className="text-[#A4A189] w-4 h-4 md:w-5 md:h-5"
              />
              <UpRightArrowIcon
                width={20}
                height={20}
                strokeWidth={4}
                className="text-[#A4A189] w-4 h-4 md:w-5 md:h-5"
              />
            </div>
            <span
              style={{ wordSpacing: "-11px" }}
              className=" md:text-justify md:after:content-[''] md:-mb-10 md:after:inline-block md:after:w-full"
            >
              {t("ecosystem.title2")}
            </span>
          </div>
        </div>
        <p className="border-b border-t border-pearl border-opacity-40 py-2 text-xs text-pearl w-full">
          {t("ecosystem.description")}
        </p>
        <div className="flex flex-col md:flex-row items-center space-x-0 space-y-4 md:space-y-0 md:space-x-2 w-full">
          <TrackerEvent event={CLICK_ON_APPLY_TO_BE_PART_OF_THE_ECOSYSTEM}>
            <PrimaryButton
              className="flex-1 font-normal rounded w-full self-stretch text-center"
              as={"a"}
              href={ADD_DAPP_FORM_URL}
              target="_blank"
              referrerPolicy="no-referrer"
              aria-label="add dapp"
            >
              {t("ecosystem.addAppButton")}
            </PrimaryButton>
          </TrackerEvent>
          <TrackerEvent event={CLICK_LEARN_BUTTON}>
            <PrimaryButton
              as={"a"}
              className="flex-1 font-normal rounded w-full text-center text-sm"
              variant="secondary"
              href={DOCS_EVMOS_URL}
              target="_blank"
              referrerPolicy="no-referrer"
              aria-label="build on evmos"
            >
              {t("ecosystem.buildButton")}
            </PrimaryButton>
          </TrackerEvent>
        </div>
      </div>
    </Frameline>
  );
};
