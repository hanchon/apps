// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export function Label({ ...rest }: ComponentProps<"label">) {
  return (
    <label
      className="text-gray-300 text-xs font-bold my-2 tracking-wider"
      {...rest}
    />
  );
}
