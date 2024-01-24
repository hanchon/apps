// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export function CryptoSelectorTitle({ ...rest }: ComponentProps<"h1"> & {}) {
  return (
    <h1
      className="text-xxxs md:text-xxs text-gray-400 pb-1 tracking-widest"
      {...rest}
    />
  );
}
