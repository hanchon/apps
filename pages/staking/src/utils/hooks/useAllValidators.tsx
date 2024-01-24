// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useMemo } from "react";

import { useTrpcQuery } from "@evmosapps/trpc/client";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { useStakingInfo } from "@evmosapps/evmos-wallet/src/api/useStake";
export const useAllValidators = () => {
  const chainRef = useEvmosChainRef();

  const validators = useTrpcQuery((t) => t.legacy.allValidators({ chainRef }));
  const { delegations } = useStakingInfo();
  const allValidators = useMemo(() => {
    const delegationByRank = new Map(
      delegations.map((delegation) => [
        delegation.delegation.validator.rank,
        delegation,
      ]),
    );
    const validatorWithDelegations =
      validators.data?.map((validator) => {
        const delegation = delegationByRank.get(validator.rank);
        return {
          validator,
          balance: {
            balance: delegation?.balance ?? { amount: "", denom: "" },
          },
        };
      }) ?? [];

    return validatorWithDelegations;
  }, [validators, delegations]);

  return { validators: allValidators };
};
