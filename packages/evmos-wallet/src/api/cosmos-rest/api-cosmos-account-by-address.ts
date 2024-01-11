import { z } from "zod";
import { CosmosAddress } from "../../wallet";

import { apiCosmosFetch } from "./api-cosmos-fetch";

export const apiCosmosAccountByAddress = (
  urls: Readonly<[string, ...string[]]>,
  address: CosmosAddress
) =>
  apiCosmosFetch(
    z.object({
      account: z
        .object({
          "@type": z.string(),
        })
        .passthrough(),
    }),
    urls,
    `/cosmos/auth/v1beta1/accounts/${address}`
  );
