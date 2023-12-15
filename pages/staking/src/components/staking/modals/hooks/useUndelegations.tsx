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
} from "@evmosapps/evmos-wallet";

import {
  CLICK_BUTTON_CONFIRM_UNDELEGATE,
  SUCCESSFUL_TX_UNDELEGATE,
  UNSUCCESSFUL_TX_UNDELEGATE,
  sendEvent,
} from "tracker";

import { EXPLORER_URL } from "constants-helper";
import { getNetwork, switchNetwork } from "wagmi/actions";
import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";
import { E } from "helpers";
import { useStakingPrecompile } from "../../../../utils/hooks/useStakingPrecompile";

const evmos = getEvmosChainInfo();

export const useUndelegation = (useUndelegateProps: UndelegateProps) => {
  const dispatch = useDispatch();

  const { undelegate } = useStakingPrecompile();

  const handleConfirmButton = async () => {
    const connectedNetwork = getNetwork();
    if (connectedNetwork.chain?.id !== evmos.id) {
      const [err] = await E.try(() =>
        switchNetwork({
          chainId: evmos.id,
        })
      );
      if (err) return;
    }
    sendEvent(CLICK_BUTTON_CONFIRM_UNDELEGATE);
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

      sendEvent(SUCCESSFUL_TX_UNDELEGATE, {
        "User Wallet Address": useUndelegateProps.wallet?.evmosAddressEthFormat,
        "Wallet Provider": useUndelegateProps.wallet?.extensionName,
      });
    } catch (e) {
      dispatch(snackErrorGeneratingTx());
      sendEvent(UNSUCCESSFUL_TX_UNDELEGATE, {
        "User Wallet Address": useUndelegateProps.wallet?.evmosAddressEthFormat,
        "Wallet Provider": useUndelegateProps.wallet?.extensionName,
        // TODO: we should update this error. Show the correct message for the error
        "Error Message": GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
      });
    }
    useUndelegateProps.setIsOpen(false);
  };

  return { handleConfirmButton };
};
