// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, SetStateAction } from "react";
import { BigNumber } from "@ethersproject/bignumber";

type Fee = {
  fee: BigNumber;
  feeDenom: string;
  feeBalance: BigNumber;
  feeDecimals: number;
};

type Balance = {
  denom: string;
  amount: BigNumber;
  decimals: number;
};

type Input = {
  value: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  confirmClicked: boolean;
};

type Style = {
  tokenTo: string;
  address: string;
  img: string;
  text: string;
};

export type FromProps = {
  fee: Fee;
  balance: Balance;
  input: Input;
  style: Style;
};
