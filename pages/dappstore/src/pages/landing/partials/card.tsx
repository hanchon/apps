// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export const Card = ({ className, ...rest }: ComponentProps<"section">) => {
  return (
    <section
      className={`${
        className ?? ""
      } space-y-8 flex flex-col justify-between rounded-lg bg-[#262017] border border-darkGray700 px-5 py-7`}
      {...rest}
    />
  );
};
