// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";
import cx from "clsx";

export const Divider = ({
  variant = "default",
  className,
  ...rest
}: ComponentProps<"div"> & {
  variant?: "default" | "info";
}) => {
  return (
    <div className={cx("relative", className)}>
      <div
        className={cx("absolute flex items-center", {
          "left-1/2 right-0 top-1/2 w-20 -translate-x-1/2 -translate-y-1/2 transform ":
            variant === "default",

          "inset-0": variant === "info",
        })}
        aria-hidden="true"
      >
        <div className="w-full border-t border-gray2" />
      </div>
      <div className="relative flex justify-center text-gray2 -top-[1px]">
        <span
          className={cx("px-2", {
            "bg-white text-gray-400 text-sm": variant === "default",

            "bg-black-900 text-pink-300 text-xs flex items-center space-x-2":
              variant === "info",
          })}
          {...rest}
        />
      </div>
    </div>
  );
};
