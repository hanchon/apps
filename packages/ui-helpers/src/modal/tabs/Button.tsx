// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TabProps } from "./types";
import { IconContainer } from "../../IconContainer";
import { ICONS_TYPES } from "constants-helper";

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
      {tab.option === tab.type && <IconContainer type={ICONS_TYPES.CHECK} />}
    </button>
  );
};
