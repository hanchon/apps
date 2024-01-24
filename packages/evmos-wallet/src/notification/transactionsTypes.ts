// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export type ConvertMsg = {
  addressEth: string;
  addressCosmos: string;
  amount: string;
  srcChain: string;
  token: string;
};

export type txStatusError = {
  code: number;
};

export type executeIBCTransferResponse = {
  error: boolean;
  message: string;
  title: string;
  txHash: string;
  explorerTxUrl: string;
};
