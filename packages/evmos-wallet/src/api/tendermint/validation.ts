import { ZodRawShape, z } from "zod";

const JSONRPCSchema = z.object({
  jsonrpc: z.string(),
  id: z.number(),
});

export const makeJSONRPCResponseSchema = <TSchema extends ZodRawShape>(
  schema: TSchema,
) => JSONRPCSchema.extend(schema);
