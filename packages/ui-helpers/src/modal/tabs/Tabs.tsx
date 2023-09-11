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
  variant: "default" | "pink";
}) => (
  <div
    className={cn(" text-sm font-medium  shrink-0", {
      "grid grid-cols-1 md:grid-cols-2 gap-4": variant === "default",
      "grid grid-cols-2 gap-4 w-fit md:w-auto tracking-wider":
        variant === "pink",
    })}
  >
    {tabsProps.map((tab) => (
      <Button key={tab.type} tab={tab} variant={variant} />
    ))}
  </div>
);
