"use client";

import { ModalWithTransitions } from "ui-helpers";

import { useModal } from "helpers";
import { useTranslation } from "@evmosapps/i18n/client";
import { COOKIE_POLICY_URL, PRIVACY_POLICY_URL } from "constants-helper";
import GrayButton from "ui-helpers/src/GrayButton";
import { DISABLE_TRACKER_LOCALSTORAGE } from "tracker";
import { Trans } from "react-i18next";

export const useConsentModal = () => useModal("consent");

export const ConsentModal = () => {
  const { t } = useTranslation();
  const { isOpen, setIsOpen, modalProps } = useConsentModal();

  return (
    <ModalWithTransitions show={isOpen} setShow={setIsOpen} propClose={true}>
      {modalProps && (
        <div className="space-y-5 bg-pearl relative max-h-[75vh] min-w-[300px] max-w-[600px] overflow-scroll rounded-lg px-5 py-8 text-black sm:max-h-full sm:overflow-auto sm:px-10 md:min-w-[400px]">
          <p className="font-bold">{t("tos.title")}</p>
          <div>
            <Trans
              t={t}
              i18nKey="consent.description"
              components={{
                privacy: (
                  <a
                    className="cursor-pointer underline"
                    rel="noopener noreferrer"
                    target="_blank"
                    href={PRIVACY_POLICY_URL}
                  />
                ),
                cookies: (
                  <a
                    className="cursor-pointer underline"
                    rel="noopener noreferrer"
                    target="_blank"
                    href={COOKIE_POLICY_URL}
                  />
                ),
              }}
            />
          </div>
          <div className="flex items-center justify-center space-x-5">
            <GrayButton
              onClick={() => {
                localStorage.removeItem(DISABLE_TRACKER_LOCALSTORAGE);

                setIsOpen(false);
              }}
            >
              {t("consent.acceptButton")}
            </GrayButton>
            <GrayButton
              onClick={() => {
                localStorage.setItem(DISABLE_TRACKER_LOCALSTORAGE, "false");

                setIsOpen(false);
              }}
            >
              {t("consent.rejectButton")}
            </GrayButton>
          </div>
        </div>
      )}
    </ModalWithTransitions>
  );
};
