// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EVMOS_BACKEND } from "../internal/wallet/functionality/networkConfig";
import { StakingInfoResponse } from "./types";

export const getStakingInfo = async (address: string) => {
  if (address === "" || address == undefined || address == null) {
    return {
      delegations: [],
      undelegations: [],
      rewards: { rewards: [], total: [] },
    };
  }
  const res = await fetch(`${EVMOS_BACKEND}/stakingInfo/${address}`);
  return res.json() as Promise<StakingInfoResponse>;
};
