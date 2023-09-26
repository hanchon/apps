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
  type = "button",
  disabled,
  ...rest
}: ComponentProps<"button"> & {
  variant?: "primary" | "outline-primary" | "primary-lg";
  icon?: JSX.Element;
  type?: string;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "w-fit text-sm px-4 py-3 rounded-lg transition-all duration-300 hover:shadow-md flex items-center justify-center space-x-3 tracking-wider",
        className,
        {
          "bg-red text-pearl hover:bg-red1 active:bg-red2":
            variant === "primary",
          "border-2 border-pink-300 gradient": variant === "outline-primary",
          "bg-red text-pearl hover:bg-red1 active:bg-red2 w-full text-base md:text-lg capitalize":
            variant === "primary-lg",
        },
        disabled ? "disabled" : "",
      )}
      disabled={disabled}
      {...rest}
    >
      {icon && <span>{icon}</span>} {children}
    </button>
  );
};
