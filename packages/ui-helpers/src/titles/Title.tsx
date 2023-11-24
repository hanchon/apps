// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

import React from "react";
import { cn } from "helpers";

export const Title = ({
  variant = "lg",
  tag = "h1",
  className,
  children,
  ...rest
}: ComponentProps<"h1"> & {
  variant?: "lg" | "small";
  tag?: "h1" | "h2" | "h3" | "h4";
}) => {
  return React.createElement(
    tag,
    {
      className: cn(
        "text-[#E8DFD3] tracking-wide",
        {
          "text-xl lg:text-2xl tracking-wide": variant === "lg",
          "text-lg lg:text-xl": variant === "small",
          ...rest,
        },
        className
      ),
    },
    children
  );
};
