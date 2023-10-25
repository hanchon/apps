// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";
import { UndelegateProps } from "../types";
import { parseUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import {
  GENERATING_TX_NOTIFICATIONS,
  snackBroadcastSuccessful,
  snackErrorGeneratingTx,
} from "evmos-wallet";

import {
  CLICK_BUTTON_CONFIRM_UNDELEGATE,
  useTracker,
  SUCCESSFUL_TX_UNDELEGATE,
  UNSUCCESSFUL_TX_UNDELEGATE,
} from "tracker";
import { useStakingPrecompile } from "../../../../internal/staking/functionality/hooks/useStakingPrecompile";
import { EXPLORER_URL } from "constants-helper";
export const useUndelegation = (useUndelegateProps: UndelegateProps) => {
  const dispatch = useDispatch();
  const { handlePreClickAction } = useTracker(CLICK_BUTTON_CONFIRM_UNDELEGATE);
  const { handlePreClickAction: successfulTx } = useTracker(
    SUCCESSFUL_TX_UNDELEGATE
  );
  const { handlePreClickAction: unsuccessfulTx } = useTracker(
    UNSUCCESSFUL_TX_UNDELEGATE
  );

  const { undelegate } = useStakingPrecompile();

  const handleConfirmButton = async () => {
    handlePreClickAction({
      wallet: useUndelegateProps?.wallet?.evmosAddressEthFormat,
      provider: useUndelegateProps?.wallet?.extensionName,
    });
    useUndelegateProps.setConfirmClicked(true);
    if (
      useUndelegateProps.value === undefined ||
      useUndelegateProps.value === null ||
      useUndelegateProps.value === "" ||
      Number(useUndelegateProps.value) === 0
    ) {
      return;
    }
    const amount = parseUnits(useUndelegateProps.value, BigNumber.from(18));

    if (amount.gt(useUndelegateProps.item.balance)) {
      return;
    }

    useUndelegateProps.setDisabled(true);

    try {
      const res = await undelegate(
        useUndelegateProps.wallet.evmosAddressEthFormat,
        useUndelegateProps.item.validatorAddress,
        amount
      );

      dispatch(snackBroadcastSuccessful(res.hash, `${EXPLORER_URL}/tx`));

      successfulTx({
        txHash: res.hash,
        wallet: useUndelegateProps.wallet?.evmosAddressEthFormat,
        provider: useUndelegateProps.wallet?.extensionName,
        transaction: "successful",
      });
    } catch (e) {
      dispatch(snackErrorGeneratingTx());
      unsuccessfulTx({
        errorMessage: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        wallet: useUndelegateProps.wallet?.evmosAddressEthFormat,
        provider: useUndelegateProps.wallet?.extensionName,
        transaction: "unsuccessful",
      });
    }
    useUndelegateProps.setShow(false);
  };

  return { handleConfirmButton };
};
