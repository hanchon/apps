// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { IntroductionModal, ModalContainer } from "ui-helpers";
import { Content } from "./Content";
import { AccountInformation } from "./AccountInformation";

export const TransferModal = () => {
  return (
    <ModalContainer
      introduction={
        <IntroductionModal
          title="Transfer Assets"
          description="Deposit and send assets to any account on any chain."
          content={<AccountInformation />}
        />
      }
      content={<Content />}
    />
  );
};
