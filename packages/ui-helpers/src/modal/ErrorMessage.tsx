// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CloseBorderIcon } from "@evmosapps/icons/CloseBorderIcon";

// for erros when the user interacts with the extension (Keplr, MM, etc)
export const ErrorMessage = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="text-red-300 ml-4 flex items-center space-x-2 px-8 py-2 text-sm">
      <CloseBorderIcon />
      {children}
    </div>
  );
};
