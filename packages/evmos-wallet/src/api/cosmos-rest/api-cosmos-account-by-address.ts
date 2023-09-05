import { z } from "zod";
import { CosmosAddress } from "../../wallet";

import { apiCosmosFetch } from "./api-cosmos-fetch";
import { BigIntSchema, BufferSchema, CosmosAddressSchema } from "./validation";

export const EthermintAccountSchema = z.object({
  "@type": z.literal("/ethermint.types.v1.EthAccount"),

  base_account: z.object({
    address: CosmosAddressSchema,
    pub_key: z
      .object({
        "@type": z.literal("/ethermint.crypto.v1.ethsecp256k1.PubKey"),
        key: BufferSchema,
      })
      .nullable(),
    account_number: BigIntSchema,
    sequence: BigIntSchema,
  }),
  code_hash: z.string(),
});

export const BaseAccountSchema = z.object({
  "@type": z.literal("/cosmos.auth.v1beta1.BaseAccount"),
  address: CosmosAddressSchema,
  pub_key: z
    .object({
      "@type": z.literal("/cosmos.crypto.secp256k1.PubKey"),
      key: BufferSchema,
    })
    .nullable(),
  account_number: BigIntSchema,
  sequence: BigIntSchema,
});

export const apiCosmosAccountByAddress = (
  urls: Readonly<[string, ...string[]]>,
  address: CosmosAddress
) =>
  apiCosmosFetch(
    z.object({
      account: z.union([BaseAccountSchema, EthermintAccountSchema]),
    }),
    urls,
    `/cosmos/auth/v1beta1/accounts/${address}`
  );
