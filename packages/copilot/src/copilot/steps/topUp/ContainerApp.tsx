// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export const ContainerApp = ({ ...rest }: ComponentProps<"div">) => {
  return (
    <div className="relative mx-auto mt-[25px] w-[600px] rounded-[15px] md:w-[600px]">
      <div className="-ml-6 w-[550px]" {...rest} />
    </div>
  );
};
