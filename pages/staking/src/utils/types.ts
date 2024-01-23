// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export type ModalDelegate = {
  moniker: string;
  commissionRate: string;
  balance: string;
  details: string;
  website: string;
  validatorAddress: string;
};

export type ModalCancelUndelegations = {
  creationHeight: string;
  validatorAddress: string;
  balance: string;
};
