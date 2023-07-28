// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ActionsMetaMask } from "./buttons/ActionsMetaMask";
import { updateCurrentStatus } from "./helpers";
import { GroupStateI, SetUpAccountI } from "./types";
import { TranslationContextProvider } from "schummar-translate/react";
import { t } from "../../../locales/translate";
export const SetUpAccount = ({
  stepsSetAccount,
  groupState,
  setGroupState,
}: {
  stepsSetAccount: SetUpAccountI[];
  groupState: GroupStateI[];
  setGroupState: React.Dispatch<React.SetStateAction<GroupStateI[]>>;
}) => {
  return (
    <TranslationContextProvider locale="en">
      <section className="space-y-3">
        <h3 className="font-bold">{t("setupaccount.title")}</h3>
        <p className="text-sm text-[#413836]">
          {t("setupaccount.description")}
        </p>
        <p className="text-sm text-[#413836]">
          {t("setupaccount.description2")}
        </p>
        <nav aria-label="Progress" className="pt-5">
          <ol role="list" className="overflow-hidden">
            {stepsSetAccount.map((step, stepIdx) => {
              return (
                <ActionsMetaMask
                  key={step.id}
                  step={step}
                  index={stepIdx}
                  length={stepsSetAccount.length}
                  statusButton={
                    updateCurrentStatus(groupState, stepIdx)
                      .filter((obj) => obj.index === stepIdx)
                      .shift()?.status ?? ""
                  }
                  setGroupState={setGroupState}
                />
              );
            })}
          </ol>
        </nav>
      </section>
    </TranslationContextProvider>
  );
};
