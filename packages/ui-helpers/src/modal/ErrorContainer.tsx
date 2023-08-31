// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ICONS_TYPES } from "constants-helper";
import { IconContainer } from "../IconContainer";

export const ErrorContainer = ({
  text,
  description,
}: {
  text?: string;
  description: string;
}) => {
  return (
    <div
      className={`bg-pearl2 flex space-x-2 rounded-lg p-4 
    `}
    >
      <IconContainer type={ICONS_TYPES.CANCEL} />
      <div className="relative text-sm cursor-default flex items-center">
        <p className="text-red2 font-bold">{text}</p>
        <p className="text-red1">{description}</p>
      </div>
    </div>
  );
};
