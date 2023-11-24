// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export const Description = ({ ...rest }: ComponentProps<"h2">) => {
  return <h2 className="text-gray1 text-xs space-y-2" {...rest} />;
};
