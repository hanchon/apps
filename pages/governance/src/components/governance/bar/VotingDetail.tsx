// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { formatAttoNumber } from "helpers";

export type VotingDetailProps = {
  bgColor: string;
  type: string;
  percent: number;
  value?: string;
};

const VotingDetail = ({ percent, value, type, bgColor }: VotingDetailProps) => {
  return (
    <div className="flex items-center space-x-2 text-xs">
      <div className={`${bgColor} h-4 w-4 flex-shrink-0 rounded-[50%]`}></div>
      <div className="font-bold text-pearl opacity-80">
        <p>{type}</p>
        <span>{Number(percent).toFixed(3)}% </span>
        {value !== undefined && (
          <span>({formatAttoNumber(value.toString())})</span>
        )}
      </div>
    </div>
  );
};

export default VotingDetail;
