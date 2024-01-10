import { apiBalancedFetch } from "../utils";
import { z } from "zod";

const CosmosSDKErrorNames = [
  "OK", // 0
  "Canceled", // 1
  "Unknown", // 2
  "InvalidArgument", // 3
  "DeadlineExceeded", // 4
  "NotFound", // 5
  "AlreadyExists", // 6
  "PermissionDenied", // 7
  "ResourceExhausted", // 8
  "FailedPrecondition", // 9
  "Aborted", // 10
  "OutOfRange", // 11
  "Unimplemented", // 12
  "Internal", // 13
  "Unavailable", // 14
  "DataLoss", // 15
  "Unauthenticated", // 16
] as const;

export type CosmosSDKErrorName = (typeof CosmosSDKErrorNames)[number];

export const apiCosmosFetch = <TSchema extends z.ZodType<unknown>>(
  schema: TSchema,
  hosts: Readonly<[string, ...string[]]>,
  pathname: string,
  init?: RequestInit & { timeout?: number; millisecondsBetweenCalls?: number }
) => apiBalancedFetch(schema, hosts, pathname, init);
