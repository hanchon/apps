// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export const Title = ({ ...rest }: ComponentProps<"h1">) => {
  return <h1 className="font-bold" {...rest} />;
};
