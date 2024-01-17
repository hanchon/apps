import { queryOptions } from "@tanstack/react-query";
import { trpc } from "../../../client";
import { raise } from "helpers";
import { Address } from "helpers/src/crypto/addresses/types";
import { ms } from "helpers/src/time";
import { ChainRef, TokenDenom } from "../../../../autogen/registry";
export const AccountBalanceByDenomQueryOptions = ({
  denom,
  chainRef,
  address,
}: {
  chainRef?: ChainRef;
  address?: Address;
  denom?: TokenDenom;
}) =>
  queryOptions({
    queryKey: ["AccountBalanceByDenom", chainRef, address, denom],
    staleTime: ms("5s"),
    queryFn: () =>
      trpc.accountBalanceByDenom.query({
        chain: chainRef ?? raise("'chain' is required"),
        address: address ?? raise("'address' is required"),
        denom: denom ?? raise("'denom' is required"),
      }),
    enabled: !!denom && !!chainRef && !!address,
  });
