// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CopyPasteIcon, MetamaskIcon } from "icons";
import { ComponentProps } from "react";
import { IconContainer } from "../IconContainer";

export function TextInput({
  showCopyIcon = true,
  extensionIcon,
  placeholder = "",
  ...rest
}: {
  showCopyIcon?: boolean;
  extensionIcon?: string;
  placeholder?: string;
} & ComponentProps<"input">) {
  return (
    <div className="w-full rounded-md bg-gray-500 py-4 px-4 text-xs font-medium flex justify-between items-center space-x-5">
      {extensionIcon && (
        <div className="w-auto h-4 flex items-center">
          <IconContainer type={extensionIcon} />
        </div>
      )}
      <input
        className="w-full bg-transparent focus-visible:outline-none placeholder:text-gray-400"
        placeholder={placeholder}
        {...rest}
      />
      {showCopyIcon && (
        <button
          className="w-auto h-4 flex items-center"
          onClick={async () => {
            await navigator.clipboard.writeText(rest.value as string);
          }}
        >
          <CopyPasteIcon />
        </button>
      )}
    </div>
  );
}
