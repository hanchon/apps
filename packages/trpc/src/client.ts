import type { AppRouter } from "./router";
import { httpBatchLink } from "@trpc/client";
import { transformer } from "./transformer";
import { createTRPCReact } from "@trpc/react-query";
import { UseQueriesProcedureRecord } from "@trpc/react-query/shared";

import { GetOptions, TRPCBaseOptions } from "./types";

export const trpc = createTRPCReact<AppRouter>();

export const useTrpcQuery = <T extends TRPCBaseOptions>(
  cb: (t: UseQueriesProcedureRecord<AppRouter>) => GetOptions<T>
) => {
  return trpc.useQueries((t) => {
    try {
      const query = cb(t);
      return [query] as const;
    } catch (e) {
      return [
        {
          queryKey: ["noop"],
          enabled: false,
        },
      ] as never;
    }
  })[0];
};

export const useTrpcSuspenseQuery = <T extends TRPCBaseOptions>(
  cb: (t: UseQueriesProcedureRecord<AppRouter>) => GetOptions<T>
) => {
  return trpc.useSuspenseQueries((t) => {
    try {
      const query = cb(t);
      return [query] as const;
    } catch (e) {
      return [
        {
          queryKey: ["noop"],
          enabled: false,
        },
      ] as never;
    }
  })[0];
};

export const createTrpcClient = () =>
  trpc.createClient({
    transformer,

    links: [httpBatchLink({ url: "/api/trpc", fetch })],
  });
