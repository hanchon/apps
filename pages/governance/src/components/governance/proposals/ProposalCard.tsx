// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BarContainer } from "@evmosapps/ui-helpers";
import ProposalStatus from "./ProposalStatus";
import IdContainer from "../common/IdContainer";
import TitleContainer from "../common/TitleContainer";

import { ProposalsQueryResponse } from "../../../utils/hooks/useProposals";
import { formatDate } from "helpers";

const ProposalCard = ({
  id,
  title,
  status,
  votingStart,
  votingEnd,
  tally,
}: ProposalsQueryResponse[number]) => {
  return (
    <div className="flex h-full cursor-pointer flex-col justify-between space-y-5 rounded-2xl bg-darkGray2 p-5 transition-all duration-300 hover:bg-darkGray2Opacity">
      <div className="flex justify-between font-bold text-pearl">
        <IdContainer id={id} />
        <ProposalStatus status={status} />
      </div>
      <TitleContainer title={title} data-testid="proposal-card-title" />
      <div className="flex text-pearl">
        <div className="space-y-1 pr-5 uppercase">
          <p className="text-sm font-bold opacity-80">
            {formatDate(votingStart)}
          </p>
          <p className="text-xs">VOTING START</p>
        </div>
        <div className="space-y-1 border-l border-darkGray5 px-5 uppercase">
          <p className="text-sm font-bold opacity-80">
            {formatDate(votingEnd)}
          </p>
          <p className="text-xs">VOTING END</p>
        </div>
      </div>
      <BarContainer {...tally} />
    </div>
  );
};

export default ProposalCard;
