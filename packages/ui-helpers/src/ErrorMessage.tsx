// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";
import { ComponentProps } from "react";

export function ErrorMessage({ className, ...rest }: ComponentProps<"p"> & {}) {
  return (
    <p
      className={cn("text-red-300 text-xs font-medium pl-4", className)}
      {...rest}
    />
  );
}
