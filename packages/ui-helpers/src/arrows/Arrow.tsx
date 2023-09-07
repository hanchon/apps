// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";
import { ComponentProps } from "react";

export function Arrow({ ...rest }: ComponentProps<"hr"> & {}) {
  return (
    <hr
      className={cn(
        "relative h-[2px] bg-gradient-to-r to-[#FCDBD6CC] from-[#FF745DCC] overflow-visible border-0 w-full my-2",
        // arrow
        "after:absolute after:block after:right-0",
        "after:h-2 after:w-2",
        "after:border-t-2 after:border-r-2 after:border-t-gradient-to-r after:border-t-[#FCDBD6CC] after:border-r-[#FCDBD6CC]",
        "after:rotate-45 after:top-1/2 after:-translate-y-1/2"
      )}
      {...rest}
    />
  );
}
