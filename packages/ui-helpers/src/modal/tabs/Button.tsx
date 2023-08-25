// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CheckIcon } from "icons";
import { TabProps } from "./types";

export const Button = ({ tab }: { tab: TabProps }) => {
  return (
    <button
      onClick={tab.onClick}
      className={`flex items-center justify-center gap-1 rounded-md px-3 py-1.5 ${
        tab.option === tab.type
          ? "border-red border-2"
          : "border-strokeGrey border"
      }`}
    >
      {tab.icon} {tab.text}
      {tab.option === tab.type && (
        <div className="bg-red text-pearl flex h-5 w-5 items-center justify-center rounded-full">
          <CheckIcon width={"14px"} height={"14px"} color="#fff" />
        </div>
      )}
    </button>
  );
};
