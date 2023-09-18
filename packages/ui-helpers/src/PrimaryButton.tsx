// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";
import { ComponentProps } from "react";

export const PrimaryButton = ({
  variant = "primary",
  onClick,
  children,
  className,
  icon,
  disabled,
  ...rest
}: ComponentProps<"button"> & {
  variant?: "primary" | "outline-primary";
  icon?: JSX.Element;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-fit text-sm px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md flex items-center justify-center space-x-3 tracking-wider",
        className,
        {
          "bg-red text-pearl hover:bg-red1 active:bg-red2":
            variant === "primary",
          "border-2 border-pink-300 gradient": variant === "outline-primary",
        },
        disabled ? "disabled" : ""
      )}
      disabled={disabled}
      {...rest}
    >
      {icon && <span>{icon}</span>} {children}
    </button>
  );
};
