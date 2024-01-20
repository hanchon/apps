// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "@ethersproject/bignumber";
import { useMemo } from "react";
import { DeepRequired } from "helpers/src/types";
import {
  E,
  formatAttoNumber,
  formatDate,
  getPercentage,
  isVotingTimeWithinRange,
  splitString,
  sumBigNumber,
} from "helpers";
import { getProposals } from "../fetch";
import { Proposal, ProposalDetailProps } from "../types";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { cosmos } from "helpers/src/clients/cosmos";
import get from "lodash-es/get";
import { Deposit } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/gov/v1beta1/gov_pb";
import {
  assertMessageType,
  isMessageType,
} from "helpers/src/crypto/protobuf/assert-message-type";
import { MsgUpdateParams } from "@buf/evmos_evmos.bufbuild_es/evmos/inflation/v1/tx_pb";
import { EthAccount } from "@buf/evmos_evmos.bufbuild_es/ethermint/types/v1/account_pb";
const [, parsedProposals] = E.try(
  () =>
    JSON.parse(process.env.NEXT_PUBLIC_PROPOSALS_TO_REMOVE ?? "[]") as string[],
);

const PROPOSALS_TO_REMOVE = parsedProposals ?? [];

const removeProposals = <
  T extends Array<{
    id: string;
  }>,
>(
  proposals: T,
  proposalToRemove: string[],
): T => {
  return proposals.filter(
    (proposal) => !proposalToRemove.includes(proposal.id),
  ) as T;
};
Deposit.typeName;
export const useProposals = (pid?: string) => {
  const test = {
    "@type": "/ethermint.types.v1.EthAccount",
    base_account: {
      address: "evmos1gxykhk5uffcrc7mqppftfrcxumqm6gz0lh8t5k",
      pub_key: {
        "@type": "/ethermint.crypto.v1.ethsecp256k1.PubKey",
        key: "AlfWj9NcMhGTB4419WnILQ77mLqfMBeJ1uCqkGT05Mk+",
      },
      account_number: "91471376",
      sequence: "154",
    },
    code_hash:
      "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
  } as unknown;
  if (isMessageType(test, "cosmos.gov.v1.MsgExecLegacyContent")) {
    console.log("test");
    if (isMessageType(test.content, "cosmos.gov.v1beta1.TextProposal")) {
    }
  }

  const chainRef = useEvmosChainRef();
  const proposalsResponse = useQuery({
    // queryKey: ["proposalss"],
    // queryFn: () => getProposals(),

    queryKey: ["proposalss", chainRef],
    queryFn: () =>
      cosmos(chainRef)
        .GET("/cosmos/gov/v1/proposals", {
          params: {
            query: {
              "pagination.limit": "1000",
              "pagination.reverse": true,
            },
          },
        })
        .then(({ data = {} }) => data as DeepRequired<typeof data>),
  });

  const proposals = useMemo(() => {
    if (!proposalsResponse.data) {
      return [];
    }
    proposalsResponse.data.proposals;
    // if (proposalsResponse.data !== undefined) {
    const filtered = removeProposals(
      proposalsResponse.data.proposals,
      PROPOSALS_TO_REMOVE,
    );

    return filtered?.map((item) => {
      const percents = getPercentage([
        item.final_tally_result.yes_count,
        item.final_tally_result.no_count,
        item.final_tally_result.abstain_count,
        item.final_tally_result.no_with_veto_count,
      ]);

      const title =
        get(item, "title") || get(item, "messages.0.content.title") || "";

      return {
        id: item.id,
        title,
        status: item.status,
        votingStartTime:
          item.voting_start_time !== ""
            ? formatDate(item.voting_start_time)
            : "",
        votingEndTime:
          item.voting_end_time !== "" ? formatDate(item.voting_end_time) : "",
        // Order for tallyResults:  yes, no, abstain, no_with_veto
        tallyResults: [
          String(percents[0]),
          String(percents[1]),
          String(percents[2]),
          String(percents[3]),
        ],
      };
    });
  }, [proposalsResponse]);

  const proposalDetail = useMemo(() => {
    let temp: ProposalDetailProps = {
      id: "--",
      title: "--",
      status: "--",
      votingStartTime: "--",
      votingEndTime: "--",
      // Order for tallyResults:  yes, no, abstain, no_with_veto
      tallyResults: ["0", "0", "0", "0"],
      tallyPercents: [0, 0, 0, 0],
      tallying: { quorum: "--", threshold: "--", veto_threshold: "--" },
      type: "--",
      totalDeposit: "--",
      submitTime: "--",
      depositEndTime: "--",
      description: "",
      total: BigNumber.from(0),
      isVotingTimeWithinRange: false,
    };
    if (proposalsResponse.data !== undefined) {
      const filtered = proposalsResponse.data.proposals?.filter(
        (proposal) =>
          proposal.id === pid && !PROPOSALS_TO_REMOVE.includes(proposal.id),
      );
      const proposalFiltered = filtered[0];
      if (!proposalFiltered) {
        return "Proposal not found, please try again";
      }

      const percents = getPercentage([
        proposalFiltered.final_tally_result.yes_count,
        proposalFiltered.final_tally_result.no_count,
        proposalFiltered.final_tally_result.abstain_count,
        proposalFiltered.final_tally_result.no_with_veto_count,
      ]);

      const tallyingData = {
        quorum: (
          Number(proposalsResponse.data.tally_params.quorum) * 100
        ).toFixed(2),
        threshold: (
          Number(proposalsResponse.data.tally_params.threshold) * 100
        ).toFixed(2),
        veto_threshold: (
          Number(proposalsResponse.data.tally_params.veto_threshold) * 100
        ).toFixed(2),
      };

      const description =
        proposalFiltered.summary ||
        proposalFiltered.messages?.[0]?.content.description ||
        "";

      const title =
        proposalFiltered.title ||
        proposalFiltered.messages?.[0]?.content.title ||
        "";

      temp = {
        id: proposalFiltered.id,
        title,
        status: proposalFiltered.status,
        votingStartTime:
          proposalFiltered.voting_start_time !== ""
            ? formatDate(proposalFiltered.voting_start_time)
            : "",
        votingEndTime:
          proposalFiltered.voting_end_time !== ""
            ? formatDate(proposalFiltered.voting_end_time)
            : "",

        // Order for tallyResults:  yes, no, abstain, no_with_veto
        tallyPercents: [...percents],
        tallyResults: [
          proposalFiltered.final_tally_result.yes_count,
          proposalFiltered.final_tally_result.no_count,
          proposalFiltered.final_tally_result.abstain_count,
          proposalFiltered.final_tally_result.no_with_veto_count,
        ],
        tallying: tallyingData,
        type:
          proposalFiltered.messages.length > 0
            ? splitString(
                proposalFiltered.messages?.[0]?.content["@type"] ?? "",
              )
            : "",
        totalDeposit:
          proposalFiltered.total_deposit.length > 0
            ? formatAttoNumber(
                BigNumber.from(
                  proposalFiltered.total_deposit?.[0]?.amount ?? 0,
                ),
              )
            : "--",
        submitTime:
          proposalFiltered.submit_time !== ""
            ? formatDate(proposalFiltered.submit_time)
            : "",
        depositEndTime:
          proposalFiltered.deposit_end_time !== ""
            ? formatDate(proposalFiltered.deposit_end_time)
            : "",
        description: description.replace(/\\[rn]/g, "\n"),
        total: sumBigNumber([
          proposalFiltered.final_tally_result.yes_count,
          proposalFiltered.final_tally_result.no_count,
          proposalFiltered.final_tally_result.abstain_count,
          proposalFiltered.final_tally_result.no_with_veto_count,
        ]),
        isVotingTimeWithinRange: isVotingTimeWithinRange(
          proposalFiltered.voting_end_time,
        ),
      };
    }
    return temp;
  }, [proposalsResponse, pid]);

  return {
    proposals,
    proposalDetail,
    loading: proposalsResponse.isLoading,
    error: proposalsResponse.error,
  };
};
