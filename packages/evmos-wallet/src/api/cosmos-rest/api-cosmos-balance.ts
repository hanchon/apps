// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

import { AmountSchema, paginateCosmosSchema } from "./validation";
import { apiCosmosFetch } from "./api-cosmos-fetch";
import { CosmosAddress } from "helpers/src/crypto/addresses/types";

export const apiCosmosBalance = (
  urls: Readonly<[string, ...string[]]>,
  address: CosmosAddress
) =>
  apiCosmosFetch(
    paginateCosmosSchema({
      balances: z.array(AmountSchema),
    }),
    urls,
    `/cosmos/bank/v1beta1/balances/${address}`
  );
