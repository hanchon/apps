// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const BROADCASTED_NOTIFICATIONS = {
  SuccessTitle: "Successfully broadcasted",
  ErrorTitle: "Error broadcasting tx",
  SubmitTitle: "Transaction submit with hash:",
} as const;

export const MODAL_NOTIFICATIONS = {
  ErrorAmountTitle: "Amount error",
  ErrorZeroAmountSubtext: "Amount cannot be 0",
  ErrorInsufficientFeeSubtext:
    "Lack sufficient balance to carry forth action. Balance needs to be above reserved amount",
  ErrorsAmountGt: "Amount is bigger than the actual balance",
  ErrorAmountEmpty: "Amount can not be empty",
  ErrorAddressTitle: "Invalid address",
  ErrorAddressSubtext: "The address does not match with the chain",
  ErrorPositiveNumberSubtext: "Amount can only be a positive number",
  ErrorAddressEmpty: "Address can not be empty",
  ErrorTokenEmpty: "Please, select a token",
  ErrorWrongPrefix: "Incorrect address",
  ErrorValidatorEmpty: "Please, select a validator",
} as const;

export const GENERATING_TX_NOTIFICATIONS = {
  ErrorGeneratingTx: "Error generating transaction, please try again later",
};

export const WALLET_NOTIFICATIONS = {
  ErrorTitle: "Wallet not connected",
};
