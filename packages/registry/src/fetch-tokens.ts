"use server";

import { TokenEntity } from "../autogen/token-entity";
import { loadRegistryTokenExtensions } from "./load-registry-token-extensions";
import { raise } from "helpers";
import { ChainType } from "./types";

import { fetchChainRegistryDirJsonFiles } from "./fetch-chain-registry-dir-json-files";
import { fetchChains } from "./fetch-chains";

export async function fetchTokens() {
  const [chainMap, fromRegistry, fromExtensions] = await Promise.all([
    fetchChains().then(
      ({ chains }) => new Map(chains.map((c) => [c.identifier, c]))
    ),
    fetchChainRegistryDirJsonFiles<TokenEntity>("tokens"),
    loadRegistryTokenExtensions(),
  ]);

  const tokens = [...fromRegistry, ...fromExtensions].map((token) => {
    const source = token.ibc?.source ?? raise("Token source not found");

    const chain = chainMap.get(source) ?? raise(`Chain ${source} not found`);
    let networkType: ChainType = chain.configurationType;

    return {
      ...token,
      source,
      networkType,
      isMainnet: networkType === "mainnet",
      exponent: parseInt(token.exponent),
      chain: {
        name: chain.chainName,
        id: chain.chainId,
        source: chain.identifier,
      },
    };
  });

  return { tokens, dt: new Date().toISOString() };
}
