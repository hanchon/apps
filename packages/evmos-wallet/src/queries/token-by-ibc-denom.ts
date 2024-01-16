import { queryOptions } from "@tanstack/react-query";
import { fetchTokenByIbcDenom } from "../server/fetch-token-by-ibc-hash.server";
import { getEvmosIdentifier } from "../wallet/actions/getEvmosIdentifier";

export const TokenByIbcDenom = ({
  chain = getEvmosIdentifier(),
  denom,
}: {
  chain?: string;
  denom?: string;
}) =>
  queryOptions({
    queryKey: ["tokenByIbcDenom", chain, denom],
    queryFn: async () => {
      if (!denom) {
        return null;
      }
      return await fetchTokenByIbcDenom(chain, denom);
    },
    staleTime: Infinity,

    enabled: !!denom,
  });
