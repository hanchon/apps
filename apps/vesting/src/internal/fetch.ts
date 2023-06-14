// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// import { EVMOS_BACKEND } from "evmos-wallet";
import { VestingResponse } from "./types";
import { DEFAULT_VESTING_VALUES } from "./helpers";

// TODO: change EVMOS_STAGING_BACKEND to EVMOS_BACKEND
const EVMOS_STAGING_BACKEND = "https://goapi-staging.evmos.org";

export const getVesting = async (account?: string) => {
  if (account === undefined) {
    return DEFAULT_VESTING_VALUES;
  }
  try {
    const res = await fetch(`${EVMOS_STAGING_BACKEND}/v2/vesting/${account}`);
    return res.json() as Promise<VestingResponse>;
  } catch (error) {
    return "Error while getting vesting account info";
  }
};
