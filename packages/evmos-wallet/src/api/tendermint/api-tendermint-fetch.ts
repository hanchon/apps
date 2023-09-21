import { apiBalancedFetch } from "../utils";
import { z } from "zod";

export const apiTendermintFetch = <TSchema extends z.ZodType<unknown>>(
  schema: TSchema,
  hosts: Readonly<[string, ...string[]]>,
  pathname: string,
  init?: RequestInit & { timeout?: number; millisecondsBetweenCalls?: number },
) => apiBalancedFetch(schema, hosts, pathname, init);
