// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export function CryptoSelectorDropdownBox({
  ...rest
}: ComponentProps<"div"> & {}) {
  return <div className="justify-center flex flex-col h-full" {...rest} />;
}
