import { StoreType } from "evmos-wallet";
import { TransferIcon } from "icons";
import { useState } from "react";
import { useSelector } from "react-redux";

import {  ModalWithTransitions, PrimaryButton } from "ui-helpers";
import { TransferModal } from "./Modal";

export const TransferButton = () => {
    const handleOnClick = () => {
        //  TODO: add logic
        setShowModal(true)
    }

    const wallet = useSelector((state: StoreType) => state.wallet.value);
    const [showModal, setShowModal] = useState(false)
    return (
        <>
        <PrimaryButton
        disabled={!wallet.active}
        //  || wallet.extensionName === METAMASK_KEY ||
        //   wallet.extensionName === WALLECT_CONNECT_KEY
        
        // add i18
        text="Transfer"
        icon={<TransferIcon />}
        onClick={handleOnClick}
      />
      <ModalWithTransitions
      show={showModal}
      setShow={setShowModal}
      content={<TransferModal />}
      propClose={true}
    //   handleCloseAction={setShowCloseModal}
    />
    </>
    )
}