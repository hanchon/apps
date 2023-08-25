// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { RequestIcon } from "icons";
import { useState } from "react";
import { ModalWithTransitions, PrimaryButton } from "ui-helpers";
import { useAccount } from "wagmi";
import { CancelModalRequest } from "./CloseModal";
import { RequestModal } from "./Modal";

export const RequestButton = () => {
  const handleOnClick = () => {
    setShowModal(true);
  };

  const { isDisconnected } = useAccount();

  const [showModal, setShowModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);

  return (
    <>
      <CancelModalRequest
        showCloseModal={showCloseModal}
        setShowCloseModal={setShowCloseModal}
        setShowModal={setShowModal}
      />
      <PrimaryButton
        disabled={isDisconnected}
        //  || wallet.extensionName === METAMASK_KEY ||
        //   wallet.extensionName === WALLECT_CONNECT_KEY

        // add i18
        text="Request"
        icon={<RequestIcon />}
        onClick={handleOnClick}
      />
      <ModalWithTransitions
        show={showModal}
        setShow={setShowModal}
        content={<RequestModal />}
        propClose={true}
        handleCloseAction={setShowCloseModal}
      />
    </>
  );
};
