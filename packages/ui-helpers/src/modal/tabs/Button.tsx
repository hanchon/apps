// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CheckIcon } from "icons";
import { TabProps } from "./types";
import cx from "clsx";

export const Button = ({
  tab,
  variant,
}: {
  tab: TabProps;
  variant: string;
}) => {
  return (
    <button
      onClick={tab.onClick}
      className={cx(
        "flex items-center justify-center gap-1 rounded-md px-3 py-1.5",
        {
          "border-red border-2":
            variant === "default" && tab.option === tab.type,
          "border-strokeGrey border":
            variant === "default" && tab.option !== tab.type,
          "border-[#FFA1A1] border-2 bg-[#FF9E90] shadow-custom-pink text-black  font-medium":
            // #CE250040
            variant === "pink" && tab.option === tab.type,
          "bg-pearl text-black font-light":
            variant === "pink" && tab.option !== tab.type,
        }
      )}
    >
      {tab.icon} {tab.text}
      {tab.option === tab.type && variant === "default" && (
        <div className="bg-red text-pearl flex h-5 w-5 items-center justify-center rounded-full">
          <CheckIcon width={"14px"} height={"14px"} color="#fff" />
        </div>
      )}
    </button>
  );
};
