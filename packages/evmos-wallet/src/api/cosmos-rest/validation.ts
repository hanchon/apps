import { ZodRawShape, z } from "zod";
import { isValidCosmosAddress } from "../../wallet/utils/addresses/is-valid-cosmos-address";

const PaginatedCosmosSchema = z.object({
  pagination: z.object({
    next_key: z.string().nullable(),
    total: z.string(),
  }),
});

export const paginateCosmosSchema = <TSchema extends ZodRawShape>(
  shape: TSchema,
) => PaginatedCosmosSchema.extend(shape);

export const BigIntSchema = z.string().transform((x) => BigInt(x));
export const AmountSchema = z.object({
  denom: z.string(),
  amount: BigIntSchema,
});

export const BufferSchema = z
  .string()
  .transform((x) => Buffer.from(x, "base64"));

export const CosmosAddressSchema = z.string().refine(isValidCosmosAddress);
