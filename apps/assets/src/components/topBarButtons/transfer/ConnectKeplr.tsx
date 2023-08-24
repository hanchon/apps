// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { KeplrIcon } from "icons";
import { Progress } from "ui-helpers";
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
    <div className="">
      {/* TODO: create a ui-helper for this and pass the h1 and h2 for each of the cases (and the icon too) */}
      <div className="bg-lightBlue flex space-x-2 justify-start rounded-lg p-4">
        <KeplrIcon />
        <div className="relative -top-[3px] text-blue text-sm">
          <h1 className="font-bold">Keplr is required</h1>
          <h2>Depositing assets can only be done with the Keplr extension.</h2>
        </div>
      </div>
      <Progress
        steps={stepsSetAccountKeplr}
        groupState={groupState}
        setGroupState={setGroupState}
      />
    </div>
  );
};
