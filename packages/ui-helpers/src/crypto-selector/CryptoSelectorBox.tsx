// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export function CryptoSelectorBox({ ...rest }: ComponentProps<"div"> & {}) {
  return (
    <div
      className="bg-gray-600 p-3 rounded-md space-y-2 md:space-y-3 mb-8"
      {...rest}
    />
  );
}
