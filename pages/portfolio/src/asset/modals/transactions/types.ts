// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import { Dispatch, SetStateAction } from "react";
import { TableDataElement } from "../../../utils/table/normalizeData";

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
