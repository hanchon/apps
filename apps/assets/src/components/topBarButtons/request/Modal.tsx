// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { IntroductionModal, ModalContainer } from "ui-helpers";
import { AccountInformation } from "../common/AccountInformation";
import { Content } from "./Content";

export const RequestModal = () => {
  return (
    <ModalContainer
      introduction={
        <IntroductionModal
          title="Request Payment"
          description="Create instant, easy-to-share payment request links for any asset on Evmos."
          content={<AccountInformation />}
        />
      }
      content={<Content />}
    />
  );
};
