// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { E, getPercentage, raise } from "helpers";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { cosmos } from "helpers/src/clients/cosmos";
import get from "lodash-es/get";
import { formatUnits } from "@evmosapps/evmos-wallet/src/registry-actions/utils";
import { safeBigInt } from "helpers/src/bigint/safe-bigint";

const [, parsedProposals] = E.try(
  () =>
    JSON.parse(process.env.NEXT_PUBLIC_PROPOSALS_TO_REMOVE ?? "[]") as string[],
);

const fetchProposalTally = async ({
  chainRef,
  proposalId,
}: {
  chainRef: string;
  proposalId: string;
}) =>
  cosmos(chainRef).GET("/cosmos/gov/v1/proposals/{proposal_id}/tally", {
    params: {
      path: {
        proposal_id: proposalId,
      },
    },
  });

const ProposalsQueryOptions = (chainRef: string) =>
  queryOptions({
    queryKey: ["proposals", chainRef],

    queryFn: async () => {
      const proposals =
        (await cosmos(chainRef)
          .GET("/cosmos/gov/v1/proposals", {
            params: {
              query: {
                "pagination.limit": "50",
                "pagination.reverse": true,
              },
            },
          })
          .then(
            ({ data = {} }) =>
              data?.proposals?.filter(
                ({ id, status }) =>
                  (id && parsedProposals?.includes(id) === false) ||
                  status !== "PROPOSAL_STATUS_DEPOSIT_PERIOD",
              ),
          )) ?? [];

      return await Promise.all(
        proposals.map(
          async ({
            id,
            title,
            summary,
            messages,
            status,
            final_tally_result,
            voting_start_time,
            voting_end_time,
            deposit_end_time = "",
            total_deposit,
            submit_time = "",
          }) => {
            if (!id || !status || !voting_start_time || !voting_end_time)
              return [];
            let tally = final_tally_result;
            if (status === "PROPOSAL_STATUS_VOTING_PERIOD") {
              const { data } = await fetchProposalTally({
                chainRef,
                proposalId: id,
              });
              tally = data?.tally ?? tally;
            }
            return [
              {
                id,
                title:
                  title || get(messages, "0.content.title") || `Proposal ${id}`,

                description:
                  summary || get(messages, "0.content.description") || "",

                status,
                tally: getPercentage({
                  yes: tally?.yes_count ?? "0",
                  no: tally?.no_count ?? "0",
                  abstain: tally?.abstain_count ?? "0",
                  noWithVeto: tally?.no_with_veto_count ?? "0",
                }),
                tallyAbsolute: {
                  yes: safeBigInt(tally?.yes_count ?? "0"),
                  no: safeBigInt(tally?.no_count ?? "0"),
                  abstain: safeBigInt(tally?.abstain_count ?? "0"),
                  noWithVeto: safeBigInt(tally?.no_with_veto_count ?? "0"),
                },
                votingStart: new Date(voting_start_time),
                votingEnd: new Date(voting_end_time),
                depositEnd: new Date(deposit_end_time),
                submitTime: new Date(submit_time),
                totalVotes: Object.values(tally ?? {}).reduce(
                  (acc, curr) => acc + safeBigInt(curr),
                  0n,
                ),
                totalDeposit: formatUnits(
                  safeBigInt(total_deposit?.[0]?.amount ?? "0"),
                  18,
                ),
                type: get(messages, "0.content.@type") ?? "",
              },
            ];
          },
        ),
      ).then((data) => data.flat());
    },
  });

type InferQueryFnData<T> = T extends { queryFn?: (...args: any[]) => infer R }
  ? Awaited<R>
  : T extends (...args: any[]) => infer Q
    ? InferQueryFnData<Q>
    : never;

export type ProposalsQueryResponse = InferQueryFnData<
  typeof ProposalsQueryOptions
>;

export const useProposals = () => {
  const chainRef = useEvmosChainRef();
  return useSuspenseQuery(ProposalsQueryOptions(chainRef));
};

export const useProposalById = (proposalId: string) => {
  const chainRef = useEvmosChainRef();
  return useSuspenseQuery({
    ...ProposalsQueryOptions(chainRef),
    select: (data) =>
      data.find(({ id }) => id === proposalId) ?? raise("Proposal not found"),
  });
};
// const proposals = useMemo(() => {
//   if (!proposalsResponse.data) {
//     return [];
//   }
//   proposalsResponse.data.proposals;

//   const filtered = removeProposals(
//     proposalsResponse.data.proposals,
//     PROPOSALS_TO_REMOVE,
//   );

//   return filtered?.map((item) => {
//     const percents = getPercentage([
//       item.final_tally_result.yes_count,
//       item.final_tally_result.no_count,
//       item.final_tally_result.abstain_count,
//       item.final_tally_result.no_with_veto_count,
//     ]);

//     const title =
//       get(item, "title") || get(item, "messages.0.content.title") || "";

//     return {
//       id: item.id,
//       title,
//       status: item.status,
//       votingStartTime:
//         item.voting_start_time !== ""
//           ? formatDate(item.voting_start_time)
//           : "",
//       votingEndTime:
//         item.voting_end_time !== "" ? formatDate(item.voting_end_time) : "",
//       // Order for tallyResults:  yes, no, abstain, no_with_veto
//       tallyResults: [
//         String(percents[0]),
//         String(percents[1]),
//         String(percents[2]),
//         String(percents[3]),
//       ],
//     };
//   });
// }, [proposalsResponse]);

// const proposalDetail = useMemo(() => {
//   let temp: ProposalDetailProps = {
//     id: "--",
//     title: "--",
//     status: "--",
//     votingStartTime: "--",
//     votingEndTime: "--",
//     // Order for tallyResults:  yes, no, abstain, no_with_veto
//     tallyResults: ["0", "0", "0", "0"],
//     tallyPercents: [0, 0, 0, 0],
//     tallying: { quorum: "--", threshold: "--", veto_threshold: "--" },
//     type: "--",
//     totalDeposit: "--",
//     submitTime: "--",
//     depositEndTime: "--",
//     description: "",
//     total: BigNumber.from(0),
//     isVotingTimeWithinRange: false,
//   };
//   if (proposalsResponse.data !== undefined) {
//     const filtered = proposalsResponse.data.proposals?.filter(
//       (proposal) =>
//         proposal.id === pid && !PROPOSALS_TO_REMOVE.includes(proposal.id),
//     );
//     const proposalFiltered = filtered[0];
//     if (!proposalFiltered) {
//       return "Proposal not found, please try again";
//     }

//     const percents = getPercentage([
//       proposalFiltered.final_tally_result.yes_count,
//       proposalFiltered.final_tally_result.no_count,
//       proposalFiltered.final_tally_result.abstain_count,
//       proposalFiltered.final_tally_result.no_with_veto_count,
//     ]);

//     const tallyingData = {
//       // quorum: (
//       //   Number(proposalsResponse.data.tally_params.quorum) * 100
//       // ).toFixed(2),
//       // threshold: (
//       //   Number(proposalsResponse.data.tally_params.threshold) * 100
//       // ).toFixed(2),
//       // veto_threshold: (
//       //   Number(proposalsResponse.data.tally_params.veto_threshold) * 100
//       // ).toFixed(2),
//       quorum: "0",
//       threshold: "0",
//       veto_threshold: "0",
//     };

//     const description =
//       get(proposalFiltered, "summary") ||
//       get(proposalFiltered, "messages.0.content.description") ||
//       "";

//     const title =
//       get(proposalFiltered, "title") ||
//       get(proposalFiltered, "messages.0.content.title") ||
//       "";
//     temp = {
//       id: proposalFiltered.id,
//       title,
//       status: proposalFiltered.status,
//       votingStartTime:
//         proposalFiltered.voting_start_time !== ""
//           ? formatDate(proposalFiltered.voting_start_time)
//           : "",
//       votingEndTime:
//         proposalFiltered.voting_end_time !== ""
//           ? formatDate(proposalFiltered.voting_end_time)
//           : "",

//       // Order for tallyResults:  yes, no, abstain, no_with_veto
//       tallyPercents: [...percents],
//       tallyResults: [
//         proposalFiltered.final_tally_result.yes_count,
//         proposalFiltered.final_tally_result.no_count,
//         proposalFiltered.final_tally_result.abstain_count,
//         proposalFiltered.final_tally_result.no_with_veto_count,
//       ],
//       tallying: tallyingData,
//       type:
//         proposalFiltered.messages.length > 0
//           ? splitString(
//               get(proposalFiltered, "messages.0.content.@type") ?? "",
//             )
//           : "",
//       totalDeposit:
//         proposalFiltered.total_deposit.length > 0
//           ? formatAttoNumber(
//               BigNumber.from(
//                 proposalFiltered.total_deposit?.[0]?.amount ?? 0,
//               ),
//             )
//           : "--",
//       submitTime:
//         proposalFiltered.submit_time !== ""
//           ? formatDate(proposalFiltered.submit_time)
//           : "",
//       depositEndTime:
//         proposalFiltered.deposit_end_time !== ""
//           ? formatDate(proposalFiltered.deposit_end_time)
//           : "",
//       description: description.replace(/\\[rn]/g, "\n"),
//       total: sumBigNumber([
//         proposalFiltered.final_tally_result.yes_count,
//         proposalFiltered.final_tally_result.no_count,
//         proposalFiltered.final_tally_result.abstain_count,
//         proposalFiltered.final_tally_result.no_with_veto_count,
//       ]),
//       isVotingTimeWithinRange: isVotingTimeWithinRange(
//         proposalFiltered.voting_end_time,
//       ),
//     };
//   }
//   return temp;
// }, [proposalsResponse, pid]);

// return {
//   proposals,
//   proposalDetail,
//   loading: proposalsResponse.isLoading,
//   error: proposalsResponse.error,
// };
// };
