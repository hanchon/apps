import { StoreType } from "evmos-wallet";
import { TransferIcon } from "icons";
import { useSelector } from "react-redux";

import {  PrimaryButton } from "ui-helpers";

export const TransferButton = () => {
    const handleOnClick = () => {
        //  TODO: add logic
    }

    const wallet = useSelector((state: StoreType) => state.wallet.value);

    return (
        <PrimaryButton
        disabled={!wallet.active}
        //  || wallet.extensionName === METAMASK_KEY ||
        //   wallet.extensionName === WALLECT_CONNECT_KEY
        
        // add i18
        text="Transfer"
        icon={<TransferIcon />}
        onClick={handleOnClick}
      />
    )
}