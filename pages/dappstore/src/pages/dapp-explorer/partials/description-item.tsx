// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";
export const DescriptionItem = ({
  title,
  ...rest
}: { title: string } & ComponentProps<"div">) => {
  return (
    <div className="space-y-2">
      <h2 className="text-[#E8DFD3] tracking-wide text-xl lg:text-2xl ">
        {title}
      </h2>
      <div
        className="text-xs lg:text-sm text-white/70 flex flex-row space-x-10"
        {...rest}
      />
    </div>
  );
};
