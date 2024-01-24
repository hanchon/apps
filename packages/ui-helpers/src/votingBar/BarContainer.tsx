// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BarWrapper } from "./BarWrapper";
import { BAR_COLORS, VOTE_TYPES } from "./styles";
import { VotingDetail } from "./VotingDetail";

export const BarContainer = (props: {
  yes: number;
  no: number;
  abstain: number;
  noWithVeto: number;
}) => {
  return (
    <div className="flex flex-col space-y-3">
      <BarWrapper {...props} />
      <div className="flex justify-between">
        <VotingDetail
          votingProps={{
            bgColor: BAR_COLORS.yes,
            type: VOTE_TYPES.yes,
            percent: props.yes,
          }}
        />
        <VotingDetail
          votingProps={{
            bgColor: BAR_COLORS.no,
            type: VOTE_TYPES.no,
            percent: props.no,
          }}
        />
        <VotingDetail
          votingProps={{
            bgColor: BAR_COLORS.abstain,
            type: VOTE_TYPES.abstain,
            percent: props.abstain,
          }}
        />
        <VotingDetail
          votingProps={{
            bgColor: BAR_COLORS.noWithVeto,
            type: VOTE_TYPES.noWithVeto,
            percent: props.noWithVeto,
          }}
        />
      </div>
    </div>
  );
};
