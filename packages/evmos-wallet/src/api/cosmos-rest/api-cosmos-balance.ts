import { z } from "zod";
import { CosmosAddress } from "../../wallet";
import { AmountSchema, paginateCosmosSchema } from "./validation";
import { apiCosmosFetch } from "./api-cosmos-fetch";

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
