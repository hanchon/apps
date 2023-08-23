// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { STEP_STATUS } from "constants-helper";
import { GroupStateI } from "./types";

export const checkAllDoneStatus = (groupState: GroupStateI[]) => {
  return groupState.every(
    (obj) =>
      Object.prototype.hasOwnProperty.call(obj, "status") &&
      obj.status === STEP_STATUS.DONE
  );
};
