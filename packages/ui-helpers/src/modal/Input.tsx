// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";
import { TextBox } from "./TextBox";

export const Input = ({
  placeholder,
  value,
  onChange,
  type = "text",
  ...rest
}: ComponentProps<"input">) => {
  return (
    <TextBox>
      <input
        className="w-full focus-visible:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        {...rest}
      />
    </TextBox>
  );
};
