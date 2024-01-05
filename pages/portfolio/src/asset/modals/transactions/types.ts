// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import { Dispatch, SetStateAction } from "react";
import {
  TableData,
  TableDataElement,
} from "../../../utils/table/normalizeData";

export type ButtonActionsProps = {
  data: TableData;
  feeBalance: BigNumber;
  address: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export type WithdrawProps = {
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  token: TableDataElement | undefined;
  inputValue: string;
  receiverAddress: string;
  address: string;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  feeBalance: BigNumber;
  chain: TableDataElement | undefined;
};

export type ConvertProps = {
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  inputValue: string;
  item: TableDataElement;
  balance: {
    balanceFrom: BigNumber;
    isIBCBalance: boolean;
  };
  setDisabled: Dispatch<SetStateAction<boolean>>;
};
