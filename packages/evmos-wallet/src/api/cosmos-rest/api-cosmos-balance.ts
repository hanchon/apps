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
