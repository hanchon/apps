import { queryOptions } from "@tanstack/react-query";
import { CosmosClientPaths, cosmos } from "helpers/src/clients/cosmos";
import omit from "lodash-es/omit";
import { HasRequiredKeys, PathsWithMethod } from "openapi-typescript-helpers";
// import { fetchToken } from "../server/fetch-token.server";
// import { raise } from "helpers";

type PathResponse<P extends PathsWithMethod<CosmosClientPaths, "get">> =
  CosmosClientPaths[P]["get"] extends {
    responses: {
      "200": {
        content: {
          "*/*": infer R;
        };
      };
    };
  }
    ? R
    : never;
type PathParameters<P extends PathsWithMethod<CosmosClientPaths, "get">> =
  CosmosClientPaths[P]["get"] extends {
    parameters: infer T;
  }
    ? T
    : never;

export const CosmosQueryOptions = <
  P extends PathsWithMethod<CosmosClientPaths, "get">,
  R = undefined,
>(
  chain: string,
  {
    route,
    params,
    queryKey,
    select,
  }: {
    route: P;
    select?: (data: PathResponse<P>) => R;
    queryKey: string[];
  } & (HasRequiredKeys<PathParameters<P>> extends never
    ? {
        params?: PathParameters<P>;
      }
    : {
        params: PathParameters<P>;
      })
) =>
  queryOptions({
    staleTime: Infinity,
    queryKey: ["cosmos-rest", chain, ...queryKey],
    queryFn: async () => {
      const response = await cosmos(chain).GET(route, {
        params,
      } as never);

      if (response.error) {
        throw new Error(JSON.stringify(response.error));
      }

      const data = response.data as PathResponse<P>;
      return (await (select?.(data) ?? data)) as R extends {}
        ? Awaited<R>
        : PathResponse<P>;
    },
  });
