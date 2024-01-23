// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import IdContainer from "../common/IdContainer";
import TitleContainer from "../common/TitleContainer";
import DescriptionItem from "./DescriptionItem";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useProposalById } from "../../../utils/hooks/useProposals";
import { notFound } from "next/navigation";
import { formatDate, raise } from "helpers";

import { UserVote } from "./UserVote";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { cosmos } from "helpers/src/clients/cosmos";

export const ProposalDescription = ({ proposalId }: { proposalId: string }) => {
  const { data } = useProposalById(proposalId);

  const chainRef = useEvmosChainRef();
  const { data: voteParams } = useSuspenseQuery({
    queryKey: ["voteParams", chainRef],
    queryFn: () => {
      return cosmos(chainRef)
        .GET("/cosmos/gov/v1beta1/params/{params_type}", {
          params: {
            path: {
              params_type: "tallying",
            },
          },
        })
        .then(({ data }) => {
          return {
            quorum: Number(data?.tally_params?.quorum ?? raise("No quorum")),
            threshold: Number(
              data?.tally_params?.threshold ?? raise("No threshold"),
            ),
            veto_threshold: Number(
              data?.tally_params?.veto_threshold ?? raise("No veto threshold"),
            ),
          };
        });
    },
  });

  if (!data) {
    notFound();
  }
  return (
    <div>
      <section className="mx-5 mb-5 space-y-5 rounded-2xl bg-darkGray2 p-5 px-5 text-sm text-pearl xl:mx-0 ">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4 ">
            <IdContainer id={data.id} />
            <TitleContainer title={data.title} />
          </div>

          <UserVote proposalId={proposalId} />
        </div>
        <div className="space-y-4">
          <DescriptionItem
            title="Total Deposit"
            description={`${data.totalDeposit} EVMOS`}
          />
          <DescriptionItem
            title="Voting Start"
            description={formatDate(data.votingStart)}
          />
          <DescriptionItem
            title="Voting end"
            description={formatDate(data.votingEnd)}
          />
          <DescriptionItem title="Type" description={data.type} />
          <DescriptionItem
            title="Submit Time"
            description={formatDate(data.submitTime)}
          />
          <DescriptionItem
            title="Deposit end time"
            description={formatDate(data.depositEnd)}
          />
          <DescriptionItem
            title="Quorum"
            description={`${voteParams.quorum * 100} %`}
          />
          <DescriptionItem
            title="Threshold"
            description={`${voteParams.threshold * 100} %`}
          />
          <DescriptionItem
            title="Veto threshold"
            description={`${voteParams.veto_threshold * 100} %`}
          />
        </div>
      </section>
      {data.description && (
        <section className="markdown mx-5 mb-5 space-y-5 break-words rounded-2xl bg-darkGray2 p-5 px-5 text-pearl xl:mx-0">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {data.description}
          </ReactMarkdown>
        </section>
      )}
    </div>
  );
};
