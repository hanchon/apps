// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";

import { VoteProps } from "../types";
import { snackExecuteIBCTransfer } from "@evmosapps/evmos-wallet";
import {
  CLICK_CONFIRM_VOTE_BUTTON,
  SUCCESSFUL_TX_VOTE,
  UNSUCCESSFUL_TX_VOTE,
  sendEvent,
} from "tracker";

import { getNetwork, switchNetwork } from "wagmi/actions";
import { E } from "helpers";
import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";
import { optionVoteSelected } from "../../../../utils/types";
import { executeVote } from "../../../../utils/transactions/vote";

const evmos = getEvmosChainInfo();
export const useVote = (useVoteProps: VoteProps) => {
  const dispatch = useDispatch();

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

    sendEvent(CLICK_CONFIRM_VOTE_BUTTON, {
      "User Wallet Address": useVoteProps.wallet?.evmosAddressEthFormat,
      "Wallet Provider": useVoteProps.wallet?.extensionName,
    });

    if (
      useVoteProps.option === undefined ||
      useVoteProps.option === null ||
      useVoteProps.id === undefined ||
      useVoteProps.id === null
    ) {
      return;
    }

    const option = optionVoteSelected[useVoteProps.option] ?? 0;

    const res = await executeVote(useVoteProps.wallet, useVoteProps.id, option);
    dispatch(snackExecuteIBCTransfer(res));
    if (res.error === true) {
      sendEvent(UNSUCCESSFUL_TX_VOTE, {
        "User Wallet Address": useVoteProps.wallet?.evmosAddressEthFormat,
        "Wallet Provider": useVoteProps.wallet?.extensionName,
        "Governance Proposal": useVoteProps.id,
        "Error Message": res.message,
      });
    } else {
      sendEvent(SUCCESSFUL_TX_VOTE, {
        "User Wallet Address": useVoteProps.wallet?.evmosAddressEthFormat,
        "Wallet Provider": useVoteProps.wallet?.extensionName,
        "Governance Proposal": useVoteProps.id,
      });
    }
    useVoteProps.setIsOpen(false);
  };

  return { handleConfirmButton };
};
