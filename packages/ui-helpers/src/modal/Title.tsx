// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { PropsWithChildren } from "react";
import cx from "clsx";

export const Title = ({
  variant = "default",
  children,
  icon,
}: PropsWithChildren<{
  variant?: "default" | "modal-black";
  icon?: JSX.Element;
}>) => {
  return (
    <h1
      className={cx("font-bold flex items-center gap-2", {
        "text-xl": variant === "modal-black",
      })}
    >
      {icon} {children}
    </h1>
  );
};
