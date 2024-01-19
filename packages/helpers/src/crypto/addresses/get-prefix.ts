// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Address } from "./types";

export const getPrefix = (address: Address): string => {
  if (address.startsWith("0x")) {
    return "evmos";
  }
  return address.split("1")[0] as string;
};
