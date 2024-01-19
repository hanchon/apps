// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import ProposalDescription from "./ProposalDescription";
import Graphic from "./Graphic";
import { useCallback } from "react";
import { BannerMessages } from "@evmosapps/ui-helpers";

import UserVote from "./UserVote";
import { useVote } from "../../../utils/hooks/useVote";
import { ProposalDetailProps } from "../../../utils/types";

const ContentProposal = ({
  proposalDetail,
  loading,
  error,
}: {
  proposalDetail: string | ProposalDetailProps;
  loading: boolean;
  error: unknown;
}) => {
  const { vote } = useVote(
    typeof proposalDetail !== "string" ? proposalDetail.id : "",
  );
  const drawContentProposal = useCallback(() => {
    const voteRecord = <UserVote voteRecord={vote} />;
    if (loading) {
      return <BannerMessages text="Loading..." spinner={true} />;
    }
    if (error) {
      return <BannerMessages text="No results" />;
    }
    if (typeof proposalDetail === "string") {
      return <BannerMessages text={proposalDetail} />;
    }
    return (
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 ">
        <section className="lg:col-span-3">
          {/* detail proposal information */}
          <ProposalDescription
            proposalDetail={proposalDetail}
            loading={loading}
            error={error}
            userVote={voteRecord}
          />
        </section>
        <Graphic
          data={proposalDetail}
          loading={loading}
          error={error}
          userVote={voteRecord}
        />
      </div>
    );
  }, [error, loading, proposalDetail, vote]);

  return drawContentProposal();
};

export default ContentProposal;
