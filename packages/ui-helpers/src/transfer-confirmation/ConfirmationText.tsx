// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";
export function ConfirmationText({ ...rest }: ComponentProps<"p"> & {}) {
  return <p className="text-gray-400 capitalize" {...rest} />;
}
