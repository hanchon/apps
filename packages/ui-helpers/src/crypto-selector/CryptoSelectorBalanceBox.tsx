// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";
export function CryptoSelectorBalanceBox({
  ...rest
}: ComponentProps<"div"> & {}) {
  return (
    <div
      className="text-xs flex justify-between pl-4 text-white tracking-wider"
      {...rest}
    />
  );
}
