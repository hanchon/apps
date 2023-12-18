// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Link } from "@evmosapps/i18n/client";
import { ComponentProps } from "react";
import { cn } from "helpers/src/classnames";

export const ButtonWithLink = ({
  className,
  ...props
}: ComponentProps<typeof Link>) => {
  return (
    <Link
      className={cn(
        "w-fit flex justify-center self-start rounded bg-[#A4A18999] px-5 py-3 text-xs md:text-sm text-pearl transition-all duration-200 ease-in-out hover:bg-[#504f43] active:bg-[#504f43]",
        className
      )}
      {...props}
    />
  );
};

export const ButtonWithoutLink = ({
  className,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "w-fit self-start rounded bg-[#423D37] px-5 py-3 text-xs text-pearl transition-all duration-200 ease-in-out hover:bg-[#534d46] active:bg-[#666059]",
        className
      )}
      {...props}
    />
  );
};
