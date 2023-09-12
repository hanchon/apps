// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { KeplrIcon } from "icons";
import { Progress, InfoPanel } from "ui-helpers";
import { stepsSetAccountKeplr } from "./utils";
import { GroupStateI } from "ui-helpers/src/progress/types";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "next-i18next";

export const ConnectKeplr = ({
  groupState,
  setGroupState,
}: {
  groupState: GroupStateI[];
  setGroupState: Dispatch<SetStateAction<GroupStateI[]>>;
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <InfoPanel icon={<KeplrIcon />}>
        <>
          <h1 className="font-bold">
            {t("transfer.deposit.keplr.error.title")}
          </h1>
          <h2>{t("transfer.deposit.keplr.error.description")}</h2>
        </>
      </InfoPanel>
      <Progress
        steps={stepsSetAccountKeplr}
        groupState={groupState}
        setGroupState={setGroupState}
      />
    </div>
  );
};
