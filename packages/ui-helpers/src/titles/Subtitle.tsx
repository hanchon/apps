// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";
import cx from "clsx";

export const Subtitle = ({
  variant = "default",
  className,
  ...rest
}: ComponentProps<"h2"> & {
  variant?: "default";
}) => {
  return (
    <h5
      className={cx(
        "tracking-wide font-light",
        {
          // {/* TODO: add color to tailwind file */}
          "text-xl text-white/70 ": variant === "default",
        },
        className
      )}
      {...rest}
    />
  );
};
