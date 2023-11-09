// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { PropsWithChildren } from "react";
import cx from "clsx";

export const Title = ({
  variant = "h1",
  children,
}: PropsWithChildren<{
  variant?: "h1";
}>) => {
  return (
    <h1
      className={cx("font-brand", {
        // {/* TODO: add color to tailwind file */}
        "text-[#E8DFD3] text-5xl tracking-wide": variant === "h1",
      })}
    >
      {children}
    </h1>
  );
};
