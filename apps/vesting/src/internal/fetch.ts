// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// import { EVMOS_BACKEND } from "evmos-wallet";

import { isValidAccount } from "../components/vesting/helpers";
import { VestingResponse } from "./types";

// TODO: change EVMOS_STAGING_BACKEND to EVMOS_BACKEND
const EVMOS_STAGING_BACKEND = "https://goapi-staging.evmos.org";

export const getVesting = async (account?: string) => {
  const address = isValidAccount(account);

  if (typeof address === "boolean" && address === false) {
    return "There is no vesting account linked to this address.";
  }

  try {
    const res = await fetch(`${EVMOS_STAGING_BACKEND}/v2/vesting/${address}`);
    return res.json() as Promise<VestingResponse>;
  } catch (error) {
    return "Error while getting vesting account info";
  }
};
