// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export const Subtitle = ({ ...rest }: ComponentProps<"h5">) => {
  return <h5 className="text-darkGray900 text-xs font-bold" {...rest} />;
};
