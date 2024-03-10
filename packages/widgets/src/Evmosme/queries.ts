import { NODE_URL } from "./constants";

export interface Validator {
  commission: {
    commission_rates: {
      max_change_rate: string;
      max_rate: string;
      rate: string;
    };
    update_time: string;
  };
  consensus_pubkey: {
    "@type": string;
    key: string;
  };
  delegator_shares: string;
  description: {
    details: string;
    identity: string;
    moniker: string;
    security_contact: string;
    website: string;
  };
  jailed: boolean;
  min_self_delegation: string;
  operator_address: string;
  status: string;
  tokens: string;
  unbonding_height: string;
  unbonding_time: string;
}

const getOptions = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

export async function getValidatorsInfo() {
  try {
    const resp = await fetch(
      `${NODE_URL}/cosmos/cosmos/staking/v1beta1/validators?pagination.limit=600`,
      getOptions,
    );

    const res = (await resp.json()) as { validators: Validator[] };

    const { validators } = res;
    const filtered = validators.sort((a: Validator, b: Validator) => {
      if (a.jailed === true) {
        return 1;
      }
      if (b.jailed === true) {
        return -1;
      }
      return parseInt(a.tokens, 10) < parseInt(b.tokens, 10) ? 1 : -1;
    });
    return filtered;
  } catch (e) {
    return null;
  }
}

export interface Coin {
  denom: string;
  amount: string;
}

export interface Reward {
  validator_address: string;
  reward: Coin[];
}
export interface DistributionRewardsResponse {
  rewards: Reward[];
  total: Coin[];
  code?: number;
}

export interface DelegationResponse {
  balance: Coin;
  delegation: {
    delegator_address: string;
    shares: string;
    validator_address: string;
  };
}

export interface GetDelegationsResponse {
  delegation_responses: DelegationResponse[];
  pagination: {
    next_key: string;
    total: number;
  };
  code?: number;
}

export async function getDistributionRewards(address: string) {
  try {
    const resp = await fetch(
      `${NODE_URL}/cosmos/distribution/v1beta1/delegators/${address}/rewards`,
      getOptions,
    );
    const rewards = (await resp.json()) as DistributionRewardsResponse;
    if (rewards.code) {
      // Node error
      return { total: [], rewards: [] };
    }
    return rewards;
  } catch (e) {
    return { total: [], rewards: [] };
  }
}

export async function getDelegations(address: string) {
  try {
    const resp = await fetch(
      `${NODE_URL}/cosmos/staking/v1beta1/delegations/${address}`,
      getOptions,
    );
    const value = (await resp.json()) as GetDelegationsResponse;
    if (value.code) {
      return [];
    }
    return value.delegation_responses;
  } catch (e) {
    return [];
  }
}
export interface UndelegationResponse {
  delegator_address: string;
  validator_address: string;
  entries: [
    {
      creation_height: string;
      completion_time: string;
      initial_balance: string;
      balance: string;
    },
  ];
}
export interface GetUndelegationsResponse {
  unbonding_responses: UndelegationResponse[];
  pagination: {
    next_key: string;
    total: string;
  };
  code?: number;
}

export async function getUndelegations(address: string) {
  try {
    const resp = await fetch(
      `${NODE_URL}/cosmos/staking/v1beta1/delegators/${address}/unbonding_delegations`,
      getOptions,
    );
    const value = (await resp.json()) as GetUndelegationsResponse;
    if (value.code) {
      return [];
    }
    return value.unbonding_responses;
  } catch (e) {
    console.error(e);
    return [];
  }
}
