// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CLICK_ON_GIVE_FEEDBACK, sendEvent } from "tracker";
import { Feedback } from "@evmosapps/ui-helpers";
import { FEEDBACK_URL } from "constants-helper";
export const GiveFeedback = () => {
  return (
    <Feedback
      href={FEEDBACK_URL}
      onClick={() => {
        sendEvent(CLICK_ON_GIVE_FEEDBACK);
      }}
    >
      Give us Feedback
    </Feedback>
  );
};
