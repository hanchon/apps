// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";
export function ContainerItem({ ...rest }: ComponentProps<"div"> & {}) {
  return (
    <p className="flex justify-between text-xs md:text-sm w-full" {...rest} />
  );
}
