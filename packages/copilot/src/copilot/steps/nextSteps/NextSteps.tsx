"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useFireworks } from "./useFireworks";
import { renderFireworksPortal } from "./helpers";
import { useEffect, useRef } from "react";
import { TranslationContextProvider } from "schummar-translate/react";
import { t } from "../../../locales/translate";
import { ButtonsNextSteps } from "./ButtonsNextSteps";
import { IconContainer } from "@evmosapps/ui-helpers";
import { ICONS_TYPES } from "constants-helper";
export const NextSteps = () => {
  const { fireworksRef, portalContainer } = useFireworks();

  const firstUpdate = useRef(true);
  useEffect(() => {
    setInterval(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
      }
    }, 5000);
  }, []);

  return (
    <TranslationContextProvider locale="en">
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        {firstUpdate.current &&
          renderFireworksPortal(fireworksRef, portalContainer)}
        <IconContainer type={ICONS_TYPES.BIG_HANDS} />
        <h1 className="font-bold">{t("nextsteps.title")}</h1>
        <p className="text-sm">{t("nextsteps.description")}</p>

        <ButtonsNextSteps />
      </div>
    </TranslationContextProvider>
  );
};
