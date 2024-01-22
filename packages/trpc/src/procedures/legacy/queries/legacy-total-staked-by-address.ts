// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Address } from "helpers/src/crypto/addresses/types";
import { serverCosmos } from "../../utils/cosmos-server-client";
import { ChainRef } from "../../../../autogen/registry";
import { assert } from "helpers";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";

export const legacyFetchTotalStakedByAddress = async ({
  chainRef,
  address,
}: {
  chainRef: ChainRef | (string & {});
  address: Address;
}) => {
  const cosmos = await serverCosmos(chainRef);
  const { data: delegations } = await cosmos.GET(
    "/cosmos/staking/v1beta1/delegations/{delegator_addr}",
    {
      params: {
        path: {
          delegator_addr: address,
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

  return {
    value: totalStaked.toString(),
  };
};

// func StakingInfo(ctx *fasthttp.RequestCtx) {
// 	address := paramToString("address", ctx)

// 	delegationsURL := buildThreeParamEndpoint("/cosmos/staking/v1beta1/delegations/", address, "?pagination.limit=150")
// 	delegationsRes, err := getRequestRest("EVMOS", delegationsURL)
// 	if err != nil {
// 		sendResponse("", err, ctx)
// 		return
// 	}

// 	var delegation DelegationResponsesResponse
// 	err = json.Unmarshal([]byte(delegationsRes), &delegation)
// 	if err != nil {
// 		sendResponse("", err, ctx)
// 		return
// 	}

// 	undelegationsURL := buildThreeParamEndpoint("/cosmos/staking/v1beta1/delegators/", address, "/unbonding_delegations")
// 	undelegationsRes, err := getRequestRest("EVMOS", undelegationsURL)
// 	if err != nil {
// 		sendResponse("unable to get delegations", err, ctx)
// 		return
// 	}

// 	var unbodings UnbondingResponseAPI
// 	err = json.Unmarshal([]byte(undelegationsRes), &unbodings)
// 	if err != nil {
// 		sendResponse("unables to get unbonding data", err, ctx)
// 		return
// 	}

// 	valMap, err := GetValidatorsWithNoFilter("EVMOS")
// 	if err != nil {
// 		sendResponse("unable to get validators data", err, ctx)
// 		return
// 	}

// 	delegationsData := []DelegationResponse{}

// 	for _, d := range delegation.DelegationResponse {
// 		_, exists := valMap[d.Delegation.ValidatorAddress]
// 		if exists {
// 			d.Delegation.Validator = valMap[d.Delegation.ValidatorAddress]
// 		}
// 		delegationsData = append(delegationsData, d)
// 	}

// 	undelegationsData := []UnbondingResponse{}

// 	for _, u := range unbodings.UnbondingResponses {
// 		_, exists := valMap[u.ValidatorAddress]
// 		if exists {
// 			u.Validator = valMap[u.ValidatorAddress]
// 		}
// 		undelegationsData = append(undelegationsData, u)
// 	}

// 	endpoint := buildThreeParamEndpoint("/cosmos/distribution/v1beta1/delegators/", address, "/rewards")

// 	rewardsRes, err := getRequestRest("EVMOS", endpoint)
// 	if err != nil {
// 		sendResponse("unable to get rewards data", err, ctx)
// 		return
// 	}

// 	var rewards StakingRewardsResponse
// 	err = json.Unmarshal([]byte(rewardsRes), &rewards)
// 	if err != nil {
// 		sendResponse("unable to get rewards data", err, ctx)
// 		return
// 	}

// 	stakingInfo := StakingInfoResponse{
// 		Delegations:   delegationsData,
// 		Undelegations: undelegationsData,
// 		Rewards:       rewards,
// 	}

// 	res, err := json.Marshal(stakingInfo)
// 	if err != nil {
// 		sendResponse("unable to get validators data", err, ctx)
// 		return
// 	}

// 	sendResponse(string(res), nil, ctx)
// }

export type DeepRequired<T> = {
  [K in keyof T]-?: Required<DeepRequired<T[K]>>;
} & {};
const fetchDelegations = async ({
  chainRef,
  address,
}: {
  chainRef: ChainRef | (string & {});
  address: Address;
}) => {
  const cosmos = await serverCosmos(chainRef);
  const { data = {} } = await cosmos.GET(
    "/cosmos/staking/v1beta1/delegations/{delegator_addr}",
    {
      params: {
        path: {
          delegator_addr: normalizeToCosmos(address),
        },
        query: {
          "pagination.limit": "150",
        },
      },
    },
  );
  return data as DeepRequired<typeof data>;
};

const fetchUnbondingResponses = async ({
  chainRef,
  address,
}: {
  chainRef: ChainRef | (string & {});
  address: Address;
}) => {
  const cosmos = await serverCosmos(chainRef);
  const { data = {} } = await cosmos.GET(
    "/cosmos/staking/v1beta1/delegators/{delegator_addr}/unbonding_delegations",
    {
      params: {
        path: {
          delegator_addr: normalizeToCosmos(address),
        },
      },
    },
  );
  return data as DeepRequired<typeof data>;
};

const fetchRewards = async ({
  chainRef,
  address,
}: {
  chainRef: ChainRef | (string & {});
  address: Address;
}) => {
  const cosmos = await serverCosmos(chainRef);
  const { data = {} } = await cosmos.GET(
    "/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards",
    {
      params: {
        path: {
          delegator_address: normalizeToCosmos(address),
        },
      },
    },
  );
  return data as DeepRequired<typeof data>;
};

export const legacyFetchAllValidators = async ({
  chainRef,
}: {
  chainRef: ChainRef | (string & {});
}) => {
  const cosmos = await serverCosmos(chainRef);
  const { data = {} } = await cosmos.GET("/cosmos/staking/v1beta1/validators", {
    params: {
      query: {
        "pagination.limit": "600",
      },
    },
    next: {
      revalidate: 30 * 60,
    },
  });

  const validators = (data.validators ?? []) as DeepRequired<
    typeof data.validators & {}
  >;

  validators.sort((a, b) => {
    const valA = BigInt(a.tokens);
    const valB = BigInt(b.tokens);
    return valA > valB ? -1 : 1;
  });

  return validators.map((validator, index) => ({
    ...validator,
    rank: index + 1,
  }));
};

export const legacyFetchStakingInfo = async ({
  chainRef,
  address,
}: {
  chainRef: ChainRef | (string & {});
  address: Address;
}) => {
  const [delegations, unbonding_responses, rewards, validators] =
    await Promise.all([
      fetchDelegations({ chainRef, address }),
      fetchUnbondingResponses({ chainRef, address }),
      fetchRewards({ chainRef, address }),
      legacyFetchAllValidators({ chainRef }),
    ]);
  const validatorsMap = Object.fromEntries(
    validators.map((value) => [value.operator_address, value]),
  );

  const delegationData = delegations.delegation_responses.flatMap(
    ({ delegation, balance }) => {
      const validator = validatorsMap[delegation.validator_address];
      if (!validator) {
        return [];
      }
      return [
        {
          delegation: {
            ...delegation,
            validator,
          },
          balance,
        },
      ];
    },
  );

  const undelegationsData =
    unbonding_responses.unbonding_responses.flatMap((unbonding_response) => {
      const validator = validatorsMap[unbonding_response.validator_address];
      if (!validator) {
        return [];
      }
      return [
        {
          ...unbonding_response,
          validator,
        },
      ];
    }) ?? [];
  return {
    delegations: delegationData,
    undelegations: undelegationsData,
    rewards,
  };
};
