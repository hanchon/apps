// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BAR_COLORS } from "./styles";

export const BarWrapper = ({
  yes,
  no,
  abstain,
  noWithVeto,
}: {
  yes: number;
  no: number;
  abstain: number;
  noWithVeto: number;
}) => {
  return (
    <div className="text-md bg-darkGray1 flex h-4 w-full overflow-hidden rounded-lg">
      <div
        className={`${BAR_COLORS.yes}`}
        style={{ width: `${yes * 100}%` }}
      ></div>
      <div
        className={`${BAR_COLORS.no}`}
        style={{ width: `${no * 100}%` }}
      ></div>
      <div
        className={`${BAR_COLORS.abstain}`}
        style={{ width: `${abstain * 100}%` }}
      ></div>
      <div
        className={`${BAR_COLORS.noWithVeto}`}
        style={{ width: `${noWithVeto * 100}%` }}
      ></div>
    </div>
  );
};
