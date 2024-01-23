// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Address } from "helpers/src/crypto/addresses/types";
import { serverCosmos } from "../../utils/cosmos-server-client";
import { ChainRef } from "../../../../autogen/registry";
import { DeepRequired } from "helpers/src/types";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";

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
