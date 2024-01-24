// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";
import { Address } from "helpers/src/crypto/addresses/types";

export type TokenBalanceProps = {
  address: Address;
  token: string;
  tokenType?: "ERC20" | "ICS20";
};
export const GAS = 3000000n;
