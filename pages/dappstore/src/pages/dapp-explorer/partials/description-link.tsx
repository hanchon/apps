// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";
import Link from "next/link";
export const DescriptionLink = ({ ...rest }: ComponentProps<typeof Link>) => {
  return (
    <Link
      className="flex flex-row space-x-2 items-center transition-all duration-300 ease-in-out hover:text-white"
      target="_blank"
      {...rest}
    />
  );
};
