"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";
import { executeRewards } from "./rewards";
import { useCallback } from "react";
import {
  CLICK_CLAIM_REWARDS_BUTTON,
  SUCCESSFUL_TX_CLAIM_REWARDS,
  UNSUCCESSFUL_TX_CLAIM_REWARDS,
  sendEvent,
} from "tracker";
import { WalletExtension } from "../../internal/wallet/functionality/wallet";
import { snackExecuteIBCTransfer } from "../../notification/helpers";
import { getNetwork, switchNetwork } from "wagmi/actions";
import { getEvmosChainInfo } from "../../wallet/wagmi/chains";
import { E } from "helpers";

const evmos = getEvmosChainInfo();

export const useRewards = (value: WalletExtension) => {
  const dispatch = useDispatch();

  const handleConfirmButton = useCallback(async () => {
    const connectedNetwork = getNetwork();
    if (connectedNetwork.chain?.id !== evmos.id) {
      const [err] = await E.try(() =>
        switchNetwork({
          chainId: evmos.id,
        })
      );
      if (err) return;
    }

    sendEvent(CLICK_CLAIM_REWARDS_BUTTON, {
      "User Wallet Address": value?.evmosAddressEthFormat,
      "Wallet Provider": value?.extensionName,
    });

    const res = await executeRewards(value);
    if (res.error === true) {
      sendEvent(UNSUCCESSFUL_TX_CLAIM_REWARDS, {
        "User Wallet Address": value?.evmosAddressEthFormat,
        "Wallet Provider": value?.extensionName,
        "Error Message": res.message,
      });
    } else {
      sendEvent(SUCCESSFUL_TX_CLAIM_REWARDS, {
        "User Wallet Address": value?.evmosAddressEthFormat,
        "Wallet Provider": value?.extensionName,
      });
    }
    dispatch(snackExecuteIBCTransfer(res));
  }, [dispatch, value]);
  return { handleConfirmButton };
};
