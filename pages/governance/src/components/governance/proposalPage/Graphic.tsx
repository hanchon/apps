// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useMemo } from "react";
import { cn, formatAttoNumber } from "helpers";
import { lookupProposalEndStatus } from "../../../utils/types";
import Arc from "../../common/arc/Arc";
import { CheckIcon } from "@evmosapps/icons/CheckIcon";
import { CloseIcon } from "@evmosapps/icons/CloseIcon";
import { BAR_COLORS, VOTE_TYPES } from "../bar/styles";
import VoteButton from "./vote/VoteButton";
import { useProposalById } from "../../../utils/hooks/useProposals";

import { UserVote } from "./UserVote";
import VotingDetail from "../bar/VotingDetail";

const Graphic = ({ proposalId }: { proposalId: string }) => {
  const { data } = useProposalById(proposalId);

  const largestWinningBlock = useMemo(() => {
    if (!data.tally) return null;
    const [largest] = Object.entries(data.tally ?? {}).sort(
      ([, a], [, b]) => b - a,
    );
    return (largest?.[0] as keyof typeof data.tally) ?? null;
  }, [data]);

  const isNotInDepositPeriod = data.status !== "PROPOSAL_STATUS_DEPOSIT_PERIOD";
  return (
    <section className="text-sm mx-5 mb-5 h-fit space-y-5 rounded-2xl bg-darkGray2 p-5 lg:mx-0">
      {isNotInDepositPeriod && (
        <div className="font-bold flex justify-between text-pearl">
          <p>Total</p>
          <p>{formatAttoNumber(data.totalVotes)} EVMOS</p>
        </div>
      )}
      {/* graphic */}
      <div className="relative">
        {largestWinningBlock &&
          data.totalVotes > 0n &&
          data.status !== "PROPOSAL_STATUS_VOTING_PERIOD" && (
            <div
              className={cn(
                "text-sm absolute inset-0 m-auto flex h-1/2 w-1/2 max-w-[50%]",
                " flex-col items-center justify-center rounded-[50%] px-2 py-1 text-center font-bold text-pearl",
                BAR_COLORS[largestWinningBlock],
              )}
            >
              {largestWinningBlock === "yes" && (
                <CheckIcon width={30} height={30} />
              )}
              {(largestWinningBlock === "no" ||
                largestWinningBlock === "noWithVeto") && (
                <CloseIcon width={30} height={30} />
              )}
              {lookupProposalEndStatus[largestWinningBlock]}
            </div>
          )}
        {data.totalVotes > 0n && (
          <Arc
            range={360}
            items={[
              {
                color: "#97AD11",
                percentage: data.tally.yes * 100,
              },
              {
                color: "#ed4e33",
                percentage: data.tally.no * 100,
              },
              {
                color: "#918378",
                percentage: data.tally.abstain * 100,
              },
              {
                color: "#edcd5b",
                percentage: data.tally.noWithVeto * 100,
              },
            ]}
          ></Arc>
        )}
      </div>
      <div className="grid grid-cols-2 gap-1">
        {(
          Object.entries(data.tally) as [keyof typeof data.tally, number][]
        ).map(([key, percent]) => {
          return (
            <VotingDetail
              key={key}
              bgColor={BAR_COLORS[key]}
              type={VOTE_TYPES[key]}
              percent={percent * 100}
              value={data.tallyAbsolute[key].toString()}
            />
          );
        })}
      </div>

      <UserVote proposalId={proposalId} />

      <VoteButton proposalId={proposalId} />
    </section>
  );
};

export default Graphic;
