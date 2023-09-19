// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";
export function CryptoSelectorBalanceText({
  ...rest
}: ComponentProps<"span"> & {}) {
  return <span className="text-gray-400 font-medium" {...rest} />;
}
