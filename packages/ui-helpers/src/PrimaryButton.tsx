// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";

export const PrimaryButton = ({
  variant = "primary",
  onClick,
  children,
  className,
  icon,
  disabled,
}: {
  variant?: "primary" | "outline-primary";
  onClick: () => void;
  children: JSX.Element | string;
  className?: string;
  icon?: JSX.Element;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-fit text-sm font-bold px-4 py-2  rounded-lg shadow transition-all duration-300 hover:shadow-md flex items-center justify-center space-x-3",
        className,
        {
          "bg-red text-pearl hover:bg-red1 active:bg-red2":
            variant === "primary",
          // TODO: add the color for the text
          "border-2 border-pink-300": variant === "outline-primary",
        },
        disabled ? "disabled" : ""
      )}
    >
      {icon && <span>{icon}</span>} {children}
    </button>
  );
};
