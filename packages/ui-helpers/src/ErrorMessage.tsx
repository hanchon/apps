// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";
import { ComponentProps } from "react";

export function ErrorMessage({
  className,
  variant = "error",
  ...rest
}: ComponentProps<"p"> & { variant: "error" | "info" }) {
  return (
    <p
      className={cn(" text-xs font-medium pl-4", className, {
        "text-red-300": variant === "error",
        "text-purple-200": variant === "info",
      })}
      {...rest}
    />
  );
}
