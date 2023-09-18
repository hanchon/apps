// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { RequestIcon } from "icons";
import { useState } from "react";
import { ModalWithTransitions, PrimaryButton } from "ui-helpers";
import { useAccount } from "wagmi";
import { CancelModalRequest } from "./CloseModal";
import { RequestModal } from "./Modal";
import { useTranslation } from "next-i18next";
import { useModal } from "../hooks/useModal";
import { useTracker, CLICK_ON_RECEIVE_BUTTON } from "tracker";

export const RequestButton = () => {
  const { isDisconnected } = useAccount();

  const [showModal, setShowModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);

  const { show, setShow } = useModal("request");
  const { t } = useTranslation();
  const { sendEvent } = useTracker();
  return (
    <>
      <PrimaryButton
        disabled={isDisconnected}
        //  || wallet.extensionName === METAMASK_KEY ||
        //   wallet.extensionName === WALLECT_CONNECT_KEY

        icon={<RequestIcon />}
        onClick={async () => {
          await setShow(true);
          sendEvent(CLICK_ON_RECEIVE_BUTTON);
        }}
      >
        {/* add i18 */}
        <p>{t("request.button")}</p>
      </PrimaryButton>
    </>
  );
};
