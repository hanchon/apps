// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useQuery } from "@tanstack/react-query";

import { cosmos } from "helpers/src/clients/cosmos";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { assert, raise } from "helpers";
import { useAccount } from "wagmi";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";

export const useStakedEvmos = () => {
  const { address } = useAccount();
  const chainRef = useEvmosChainRef();

  return useQuery({
    queryKey: ["totalStaked", chainRef, address],
    enabled: !!address,
    queryFn: async () => {
      const { data: delegations } = await cosmos(chainRef).GET(
        "/cosmos/staking/v1beta1/delegations/{delegator_addr}",
        {
          params: {
            path: {
              delegator_addr: normalizeToCosmos(address ?? raise("No address")),
            },
            query: {
              "pagination.limit": "200",
            },
          },
        },
      );
      assert(delegations?.delegation_responses, "delegations not found");
      const totalStaked = delegations.delegation_responses.reduce(
        (total, delegation) => total + BigInt(delegation.balance?.amount ?? 0),
        0n,
      );
      return totalStaked;
    },
  });
};
