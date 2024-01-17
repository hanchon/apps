import { z } from "zod";

import { apiCosmosFetch } from "./api-cosmos-fetch";
import { CosmosAddress } from "helpers/src/crypto/addresses/types";

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
