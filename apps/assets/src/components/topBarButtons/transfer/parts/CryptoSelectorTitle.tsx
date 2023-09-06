// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export const CryptoSelectorTitle = ({ ...rest }: ComponentProps<"h3"> & {}) => {
  return <h1 className="text-xs font-medium text-gray-400 pb-1" {...rest} />;
};
