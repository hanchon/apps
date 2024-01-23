// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { cosmos } from "helpers/src/clients/cosmos";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { raise } from "helpers";
const VOTING_LOOKUP = {
  VOTE_OPTION_UNSPECIFIED: "Not Voted",
  VOTE_OPTION_YES: "Yes",
  VOTE_OPTION_ABSTAIN: "Abstain",
  VOTE_OPTION_NO: "No",
  VOTE_OPTION_NO_WITH_VETO: "No with Veto",
};

export const useUserVote = (proposalId: string) => {
  const { address } = useAccount();
  const chainRef = useEvmosChainRef();

  return useQuery({
    queryKey: ["vote", chainRef, proposalId, address],
    queryFn: () =>
      cosmos(chainRef)
        .GET("/cosmos/gov/v1/proposals/{proposal_id}/votes/{voter}", {
          params: {
            path: {
              proposal_id: proposalId,
              voter: normalizeToCosmos(address ?? raise("No address")),
            },
          },
        })
        .then(({ data }) => {
          const highestWeightOption = data?.vote?.options?.[0]?.option;
          return {
            response: data,
            vote: highestWeightOption
              ? VOTING_LOOKUP[highestWeightOption]
              : undefined,
          };
        }),

    enabled: !!address,
  });
};
