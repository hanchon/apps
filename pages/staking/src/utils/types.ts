// Copyright Tharsis Labs Ltd.(Evmos)
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
