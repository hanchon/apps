"use client";

import { Modal } from "@evmosapps/ui-helpers";

import { modalLink, useModal } from "helpers";
import { useTranslation } from "@evmosapps/i18n/client";
import { COOKIE_POLICY_URL, PRIVACY_POLICY_URL } from "constants-helper";
import GrayButton from "@evmosapps/ui-helpers/src/GrayButton";
import { DISABLE_TRACKER_LOCALSTORAGE } from "tracker";
import { Trans } from "react-i18next";

export const useConsentModal = () => useModal("consent");
export const ConsentModalButton = modalLink("consent");
export const ConsentModal = () => {
  const { t } = useTranslation();
  const { isOpen, setIsOpen, modalProps } = useConsentModal();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body className="bg-pearl">
        {modalProps && (
          <div className="space-y-5">
            <Modal.Header>
              <h2 className="font-bold">{t("tos.title")}</h2>
            </Modal.Header>
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
      </Modal.Body>
    </Modal>
  );
};
