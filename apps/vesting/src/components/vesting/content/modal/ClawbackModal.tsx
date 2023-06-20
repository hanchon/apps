import { ConfirmButton, ModalTitle } from "ui-helpers";
import { ItemModal } from "./ItemModal";
import { ExclamationIcon } from "icons";
import { VestingAccountDetail } from "../../../../internal/types";
import { convertFromAtto, formatNumber } from "helpers";
import {
  createContract,
  VESTING_CONTRACT_ADDRESS,
  VestingABI,
} from "evmos-wallet";
import {
  VestingI,
  StoreType,
  addSnackbar,
  SNACKBAR_CONTENT_TYPES,
  SNACKBAR_TYPES,
  GENERATING_TX_NOTIFICATIONS,
  BROADCASTED_NOTIFICATIONS,
} from "evmos-wallet";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

// TODO: format totalTokens and availableClawback depending on the response
export const ClawbackModal = ({
  vestingDetails,
}: {
  vestingDetails: VestingAccountDetail;
}) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const handleOnClick = async () => {
    try {
      setDisabled(true);
      const contract = await createContract(
        VESTING_CONTRACT_ADDRESS,
        VestingABI,
        wallet.extensionName
      );
      if (contract === null) {
        dispatch(
          addSnackbar({
            id: 0,
            content: {
              type: SNACKBAR_CONTENT_TYPES.TEXT,
              title: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
            },
            type: SNACKBAR_TYPES.ERROR,
          })
        );
        setDisabled(false);
        return;
      }
      // setDisabled(true);
      const res = await (contract as VestingI).clawback(
        vestingDetails.funderAddress,
        vestingDetails.accountAddress,
        vestingDetails.funderAddress
      );
      dispatch(
        addSnackbar({
          id: 0,
          content: {
            type: SNACKBAR_CONTENT_TYPES.LINK,
            title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
            hash: res.hash,
            explorerTxUrl: "www.mintscan.io/evmos/txs/",
          },
          type: SNACKBAR_TYPES.SUCCESS,
        })
      );
      setDisabled(false);
    } catch (e) {
      // TODO: Add Sentry here!
      dispatch(
        addSnackbar({
          id: 0,
          content: {
            type: SNACKBAR_CONTENT_TYPES.TEXT,
            title: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
          },
          type: SNACKBAR_TYPES.ERROR,
        })
      );
    }
  };

  const totalTokens = () => {
    return formatNumber(convertFromAtto(vestingDetails.unvestedAmount, 18), 6);
  };

  const availableClawback = () => {
    return formatNumber(
      convertFromAtto(vestingDetails.originalVestingAmount, 18),
      6
    );
  };
  return (
    <div className="space-y-5">
      <ModalTitle title="Clawback Tokens" />
      <div className=" rounded border-2 border-darkGray2 p-4">
        Clawback retrieves all unvested tokens from a vesting account.
      </div>
      <ItemModal
        title="Account Address"
        description={vestingDetails.accountAddress}
      />
      <ItemModal
        title="Total Vesting Tokens"
        description={`${totalTokens()} EVMOS `}
      />
      <ItemModal
        title="Available for Clawback"
        description={`${availableClawback()} EVMOS `}
      />
      <div>
        <div className="flex items-center space-x-1 ">
          <ExclamationIcon className="text-red" />
          <span className="text-lg font-bold">CAUTION</span>
        </div>
        Clawback cannot be undone! Please make sure you want to do this action.
      </div>

      <ConfirmButton
        disabled={disabled}
        text="Clawback"
        onClick={handleOnClick}
      />
    </div>
  );
};
