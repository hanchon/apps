// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { raise } from "helpers";
import { WalletExtension } from "../../internal/wallet/functionality/wallet";
import { BROADCASTED_NOTIFICATIONS } from "../../notification/errors";

import {
  apiStakingRewards,
  executeApiTransaction,
  mapExecuteResponse,
} from "../../api";

export const executeRewards = async (wallet: WalletExtension) => {
  const { apiResponse, error, hash } = await executeApiTransaction(() =>
    apiStakingRewards({
      address: wallet.evmosAddressCosmosFormat,
      pubkey: wallet.evmosPubkey ?? raise("ACCOUNT_NOT_FOUND"),
    }),
  );
  if (error) {
    return mapExecuteResponse({
      error: true,
      message: error.message,
      title: BROADCASTED_NOTIFICATIONS.ErrorTitle,
    });
  }
  return mapExecuteResponse({
    error: false,
    message: `${BROADCASTED_NOTIFICATIONS.SubmitTitle} ${hash}`,
    title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
    txHash: hash,
    explorerTxUrl: apiResponse.explorerTxUrl,
  });
};
