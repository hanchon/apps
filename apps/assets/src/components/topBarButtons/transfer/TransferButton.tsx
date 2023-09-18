// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { SendIcon } from "icons";
import { useEffect, useState } from "react";
import { PrimaryButton } from "ui-helpers";
import { getTransferModalState } from "./utils";
import { useAccount } from "wagmi";
import { CancelModalTransfer } from "./CloseModal";
import { useTranslation } from "next-i18next";
import { useModal } from "../hooks/useModal";
import { CLICK_ON_SEND_BUTTON, useTracker } from "tracker";

export const TransferButton = () => {
  const handleOnClick = () => {
    setShowModal(true);
  };
  const { setShow } = useModal("transfer");

  const { isDisconnected } = useAccount();

  const [showModal, setShowModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  useEffect(() => {
    const reload = getTransferModalState().reloadKeplr;
    if (reload) {
      setShowModal(true);
    }
  }, [setShowModal]);

  const { t } = useTranslation();

  const { sendEvent } = useTracker();
  // CLICK_ON_SEND_BUTTON
  // CLICK_ON_RECEIVE_BUTTON

  return (
    <>
      <CancelModalTransfer
        showCloseModal={showCloseModal}
        setShowCloseModal={setShowCloseModal}
        setShowModal={setShowModal}
      />
      <PrimaryButton
        disabled={isDisconnected}
        //  || wallet.extensionName === METAMASK_KEY ||
        //   wallet.extensionName === WALLECT_CONNECT_KEY

        icon={<SendIcon />}
        onClick={async () => {
          await setShow(true);
          sendEvent(CLICK_ON_SEND_BUTTON);
        }}
      >
        {/* // add i18 */}
        <p>{t("transfer.button")}</p>
      </PrimaryButton>
      {/* <ModalWithTransitions
        show={showModal}
        setShow={setShowModal}
        propClose={true}
        handleCloseAction={setShowCloseModal}
      >
        <TransferModal />
      </ModalWithTransitions> */}
    </>
  );
};
