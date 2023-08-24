// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { KeplrIcon } from "icons";
import { Progress, WizardHelper } from "ui-helpers";
import { stepsSetAccountKeplr } from "./utils";
import { GroupStateI } from "ui-helpers/src/progress/types";
import { Dispatch, SetStateAction } from "react";

export const ConnectKeplr = ({
  groupState,
  setGroupState,
}: {
  groupState: GroupStateI[];
  setGroupState: Dispatch<SetStateAction<GroupStateI[]>>;
}) => {
  return (
    <div>
      <WizardHelper icon={<KeplrIcon />}>
        <>
          <h1 className="font-bold">Keplr is required</h1>
          <h2>Depositing assets can only be done with the Keplr extension.</h2>
        </>
      </WizardHelper>
      <Progress
        steps={stepsSetAccountKeplr}
        groupState={groupState}
        setGroupState={setGroupState}
      />
    </div>
  );
};
