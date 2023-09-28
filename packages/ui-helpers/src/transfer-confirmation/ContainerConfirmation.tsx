// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export const ContainerConfirmation = ({
  ...rest
}: ComponentProps<"div"> & {}) => {
  return (
    <div
      className="flex items-center justify-center flex-col text-xl tracking-wider space-y-8"
      {...rest}
    />
  );
};
