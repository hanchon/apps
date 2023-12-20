// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CLICK_ON_GIVE_FEEDBACK } from "tracker";
import { Feedback, TrackerEvent } from "@evmosapps/ui-helpers";
import { FEEDBACK_URL } from "constants-helper";
export const GiveFeedback = () => {
  return (
    <TrackerEvent event={CLICK_ON_GIVE_FEEDBACK}>
      <Feedback href={FEEDBACK_URL}>Give us Feedback</Feedback>
    </TrackerEvent>
  );
};
