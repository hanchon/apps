"use server";

import { fetchChains } from "@evmosapps/registry/src/fetch-chains";
import { fetchTokens } from "@evmosapps/registry/src/fetch-tokens";
import { cosmos } from "helpers/src/clients/cosmos";

export const fetchTokenByIbcDenom = async (
  ibcDenom: string,
  chainId = "evmos"
) => {
  const [{ tokens }, { chains }] = await Promise.all([
    fetchTokens(),
    fetchChains(),
  ]);

  const trace = await cosmos(chainId).GET(
    "/ibc/apps/transfer/v1/denom_traces/{hash}",
    {
      params: {
        path: {
          hash: ibcDenom,
        },
      },
    }
  );

  const path = trace.data?.denom_trace?.path;
  const baseDenom = trace.data?.denom_trace?.base_denom;

  if (!baseDenom || !path) {
    return null;
  }

  const chain =
    chains.find((chain) =>
      chain.source.destinationChannel
        ? path.endsWith(chain.source.destinationChannel)
        : false
    ) ?? null;

  if (!chain) return null;
  return (
    tokens.find(
      (token) =>
        token.source === chain?.identifier && token.minCoinDenom === baseDenom
    ) ?? null
  );
};
