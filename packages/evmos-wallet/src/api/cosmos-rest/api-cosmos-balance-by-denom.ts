import { z } from "zod";
import { CosmosAddress } from "../../wallet";
import { apiCosmosFetch } from "./api-cosmos-fetch";
import { AmountSchema } from "./validation";

export const apiCosmosBalanceByDenom = (
  urls: Readonly<[string, ...string[]]>,
  address: CosmosAddress,
  denom: string
) =>
  apiCosmosFetch(
    z.object({
      balance: AmountSchema,
    }),
    urls,
    `/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=${denom}`
  );
