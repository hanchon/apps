// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ProposalDescription } from "./ProposalDescription";
import Graphic from "./Graphic";

export const ContentProposal = ({ proposalId }: { proposalId: string }) => {
  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 ">
      <section className="lg:col-span-3">
        <ProposalDescription proposalId={proposalId} />
      </section>
      <Graphic proposalId={proposalId} />
    </div>
  );
};
