import { apiBalancedFetch } from "../utils";
import { z } from "zod";

export const TendermintErrorSchema = z
  .object({
    id: z.number(),
    jsonrpc: z.string(),
    error: z.string(),
  })
  .transform(({ error }) => {
    return new Error(error);
  });

export const apiTendermintFetch = <TSchema extends z.ZodType<unknown>>(
  schema: TSchema,
  hosts: Readonly<[string, ...string[]]>,
  pathname: string,
  init?: RequestInit & { timeout?: number; millisecondsBetweenCalls?: number },
) => apiBalancedFetch(schema, TendermintErrorSchema, hosts, pathname, init);
