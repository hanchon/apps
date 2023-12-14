// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getVesting } from "../fetch";
import { VestingAccountDetail, VestingResponse } from "../types";

export const useVestingAccounts = (account?: string) => {
  const vestingResponse = useQuery<VestingResponse | { error: string }>({
    queryKey: ["vesting", account],
    queryFn: () => getVesting(account),
  });

  const vestingDetails = useMemo<VestingAccountDetail | string>(() => {
    if (vestingResponse.data === undefined) {
      return {
        accountAddress: "",
        funderAddress: "",
        unvestedAmount: "",
        originalVestingAmount: "",
      };
    }

    if ("error" in vestingResponse.data) {
      return vestingResponse.data.error;
    }

    if (
      vestingResponse?.data?.unvested === undefined ||
      vestingResponse?.data?.unvested === null
    ) {
      return "Something went wrong, please try again later";
    }
    return {
      accountAddress:
        vestingResponse?.data?.account?.base_vesting_account?.base_account
          .address,
      funderAddress: vestingResponse?.data?.account?.funder_address,
      unvestedAmount: vestingResponse?.data?.unvested[0]?.amount ?? "",
      originalVestingAmount:
        vestingResponse?.data.account?.base_vesting_account?.original_vesting[0]
          ?.amount ?? "",
    };
  }, [vestingResponse]);

  return {
    vestingDetails: vestingDetails,
    loading: vestingResponse.isLoading,
    error: vestingResponse.error,
  };
};
