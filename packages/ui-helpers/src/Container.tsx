// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid min-h-screen min-w-[300px] bg-black">
      <div className="flex h-full w-full flex-col overflow-auto bg-auto bg-center bg-repeat px-0 font-body sm:px-5 xl:px-14">
        {children}
      </div>
    </div>
  );
};
