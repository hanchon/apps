// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// import { EVMOS_BACKEND } from "evmos-wallet";
import { isValidAccount } from "../components/vesting/helpers";
import { VestingResponse } from "./types";

// TODO: change EVMOS_STAGING_BACKEND to EVMOS_BACKEND
// const EVMOS_STAGING_BACKEND = "https://goapi-staging.evmos.org";

export const getVesting = async (account: string | false) => {
  if (account === false || account === "undefined") {
    return "There is no vesting account linked to this address.";
  }

  const isValid = isValidAccount(account);
  if (!isValid || isValid === "undefined") {
    return "Invalid account parameter.";
  }
  try {
    const res = await fetch(
      // eslint-disable-next-line no-secrets/no-secrets
      `https://goapi-staging.evmos.org/v2/vesting/evmos1fwrmzh6kp2dh0wuevhzfsck0eeeqc54tpvkvc2`
    );
    return res.json() as Promise<VestingResponse>;
  } catch (error) {
    return "Error while getting vesting account info";
  }
};
