// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "@ethersproject/bignumber";
import { useMemo } from "react";

import {
  DelegationsResponse,
  StakingInfoResponse,
  UndelegationsResponse,
} from "./types";
import { getStakingInfo } from "./fetch";

import { convertStringFromAtto } from "helpers/src/styles";
import { useAccount } from "wagmi";

import { raise } from "helpers";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";

export const useStake = () => {
  const { address } = useAccount();

  const stakingInfo = useQuery<StakingInfoResponse, Error>({
    queryKey: ["stakingInfo", address],
    enabled: !!address,
    queryFn: () =>
      getStakingInfo(normalizeToCosmos(address ?? raise("Address not found"))),
    refetchInterval: 15_000,
  });

  const totalDelegations = useMemo(() => {
    let total = BigNumber.from(0);
    if (stakingInfo.data !== undefined) {
      const sum = stakingInfo.data?.delegations?.reduce((prev, curr) => {
        return prev.add(BigNumber.from(curr?.balance.amount));
      }, total);
      total = sum ? sum : BigNumber.from(0);

      return total;
    }

    return total;
  }, [stakingInfo]);

  const totalUndelegations = useMemo(() => {
    let total = BigNumber.from(0);
    if (stakingInfo.data !== undefined) {
      // for each validator, get the undelegations balances
      // that are in the entries array
      stakingInfo.data?.undelegations?.forEach((validator) => {
        const sum = validator.entries.reduce((prev, curr) => {
          return prev.add(BigNumber.from(curr?.balance));
        }, total);
        total = sum ? sum : BigNumber.from(0);
      });
      return total;
    }
    return total;
  }, [stakingInfo]);

  const totalRewards = useMemo(() => {
    let total = "0";
    if (
      stakingInfo.data !== undefined &&
      stakingInfo.data.rewards !== undefined &&
      stakingInfo.data.rewards.total !== null &&
      stakingInfo.data.rewards.total.length !== 0
    ) {
      // the sum is already done in the backend
      total = stakingInfo.data.rewards.total[0]?.amount ?? "0";
    }

    return convertStringFromAtto(total);
  }, [stakingInfo]);

  const delegations = useMemo(() => {
    let delegations: DelegationsResponse[] = [];
    if (stakingInfo.data !== undefined) {
      delegations = stakingInfo.data?.delegations ?? [];
      delegations.sort((a, b) => {
        return a.delegation.validator.rank > b.delegation.validator.rank
          ? 1
          : -1;
      });
    }
    return delegations;
  }, [stakingInfo]);

  const undelegations = useMemo(() => {
    let undelegations: UndelegationsResponse[] = [];
    if (stakingInfo.data !== undefined) {
      undelegations = stakingInfo.data?.undelegations ?? [];
      undelegations.sort((a, b) => {
        return a.validator.rank > b.validator.rank ? 1 : -1;
      });
    }
    return undelegations;
  }, [stakingInfo]);

  return {
    totalDelegations,
    totalUndelegations,
    totalRewards,
    delegations,
    undelegations,
    rewards: stakingInfo?.data?.rewards,
  };
};
