// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "ethers";
import { convertFromAtto } from "helpers";
import { WalletExtension } from "../../internal/wallet/functionality/wallet";
export const getBalance = (amount: BigNumber, wallet: WalletExtension) => {
  if (!wallet.active) {
    return "-";
  }
  if (amount.isZero()) {
    return "0";
  }
  return Number(convertFromAtto(amount)).toFixed(2);
};

export const getBalanceInDollars = (
  amount: BigNumber,
  wallet: WalletExtension,
  evmosPrice: string
) => {
  if (!wallet.active) {
    return "-";
  }

  if (amount.isZero()) {
    return "0";
  }
  return (Number(convertFromAtto(amount)) * Number(evmosPrice)).toFixed(2);
};

export const getNumberBalance = (amount: number, wallet: WalletExtension) => {
  if (!wallet.active) {
    return "-";
  }
  if (amount === 0) {
    return "0";
  }
  return amount.toFixed(2);
};

export const getNumberBalanceInDollars = (
  amount: number,
  wallet: WalletExtension,
  evmosPrice: string
) => {
  if (!wallet.active) {
    return "-";
  }
  if (amount === 0) {
    return "0";
  }
  return (amount * Number(evmosPrice)).toFixed(2);
};
