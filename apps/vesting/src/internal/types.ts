type LockedResponse = {
  denom: string;
  amount: string;
};

type UnvestedResponse = {
  denom: string;
  amount: string;
};

type AccountResponse = {
  "@type": string;
  base_vesting_account: {
    base_account: {
      address: string;
      pub_key: string;
      account_number: string;
      sequence: string;
    };
    original_vesting: {
      denom: string;
      amount: string;
    }[];
    end_time: string;
  };
  funder_address: string;
  start_time: string;
  lockup_periods: {
    length: string;
    amount: { denom: string; amount: string }[];
  }[];
  vesting_periods: {
    length: string;
    amount: { denom: string; amount: string }[];
  }[];
};

export interface VestingResponse {
  locked: LockedResponse[];
  unvested: UnvestedResponse[];
  vested: [];
  account: AccountResponse;
}

// TODO: use Pick
export type VestingAccountDetail = {
  accountAddress: string;
  funderAddress: string;
  unvestedAmount: string;
  originalVestingAmount: string;
};
