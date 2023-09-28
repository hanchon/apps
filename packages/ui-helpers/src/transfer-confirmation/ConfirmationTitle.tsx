// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";
import cx from "clsx";

export function ConfirmationTitle({
  variant = "success",
  ...rest
}: ComponentProps<"h1"> & { variant?: "success" | "error" }) {
  return (
    <h1
      className={cx("text-lg md:text-xl font-bold", {
        "text-green-200": variant === "success",
        "text-red-900": variant === "error",
      })}
      {...rest}
    />
  );
}
