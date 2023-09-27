// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Button } from "./Button";
import { TabProps } from "./types";
import { cn } from "helpers";

export const Tabs = ({
  tabsProps,
  variant = "default",
}: {
  tabsProps: TabProps[];
  variant?: "default" | "pink" | "pink-small";
}) => (
  <div
    className={cn("font-medium shrink-0", {
      "grid grid-cols-1 md:grid-cols-2 gap-3 text-sm ": variant === "default",
      "grid grid-cols-2 gap-2 w-fit md:w-auto tracking-wider text-xs md:text-sm":
        variant === "pink",
      "grid grid-cols-2 gap-2 w-fit tracking-wider text-xs md:text-sm":
        variant === "pink-small",
    })}
  >
    {tabsProps.map((tab) => (
      <Button
        key={tab.type}
        tab={tab}
        variant={variant}
        disabled={tab.disabled}
      />
    ))}
  </div>
);
