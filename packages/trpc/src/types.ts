// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

/*  eslint-disable @typescript-eslint/no-explicit-any */
/* copy from @trpc/react-query because it's not exported */
import { UseQueryOptions } from "@tanstack/react-query";

export type TRPCBaseOptions = Omit<
  UseQueryOptions<any, any, any, any>,
  "queryKey"
>;

type QueryKey = ReadonlyArray<unknown>;
type DistributiveOmit<TObj, TKey extends keyof any> = TObj extends any
  ? Omit<TObj, TKey>
  : never;
type UseQueryOptionsForUseQueries<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = DistributiveOmit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryKey"
>;
export type GetOptions<TQueryOptions> =
  TQueryOptions extends UseQueryOptionsForUseQueries<any, any, any, any>
    ? TQueryOptions
    : never;
