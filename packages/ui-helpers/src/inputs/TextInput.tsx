// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CopyPasteIcon } from "icons";
import { ComponentProps } from "react";

export function TextInput({
  showIcon = true,
  placeholder = "",
  ...rest
}: {
  showIcon?: boolean;
  placeholder?: string;
} & ComponentProps<"input">) {
  return (
    <div className="w-full rounded-md bg-gray-500 py-4 px-4 text-xs font-medium flex justify-between items-center space-x-5">
      <input
        className="w-full bg-transparent focus-visible:outline-none placeholder:text-gray-400"
        placeholder={placeholder}
        {...rest}
      />
      {showIcon && (
        <button
          className=" w-auto h-4 flex items-center "
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <CopyPasteIcon />
        </button>
      )}
    </div>
  );
}
