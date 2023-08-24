import { StoreType } from "evmos-wallet";
import { TransferIcon } from "icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ModalWithTransitions, PrimaryButton } from "ui-helpers";
import { TransferModal } from "./Modal";
import { checkReloadFlagToReloadKeplrModal } from "./utils";

export const TransferButton = () => {
  const handleOnClick = () => {
    setShowModal(true);
  };

  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const reload = checkReloadFlagToReloadKeplrModal();
    if (reload) {
      setShowModal(true);
    }
  }, [setShowModal]);
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
      />
    </>
  );
};
