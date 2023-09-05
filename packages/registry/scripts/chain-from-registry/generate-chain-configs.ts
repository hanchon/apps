import { groupBy } from "lodash-es";
import { chainRegistry, tokenRegistry } from "./registry.ts";
import { Chain, Token } from "../../src/types.ts";

import { TokenRegistry } from "./types.ts";
import { generateAssets } from "./download-asset.ts";
import { logger } from "./log.ts";

const normalizeNetworkUrls = (urls?: string[]) => {
  if (!urls) {
    return null;
  }
  const http = urls.filter(Boolean);
  if (http.length === 0) {
    return null;
  }
  return {
    http: http as [string, ...string[]],
  };
};

async function generateTokens(tokenRegistries: TokenRegistry[]) {
  return (await Promise.all(
    tokenRegistries.map(async (token) => {
      logger.info(
        token.coinSourcePrefix,
        `Generating ${token.coinDenom} token`,
        1
      );
      logger.info(
        token.coinSourcePrefix,
        `Downloading assets from ${token.coinDenom}`,
        1
      );
      const images = await generateAssets(
        token.coinDenom,
        token.pngSrc,
        token.imgSrc
      );
      return {
        name: token.name,
        description: token.description,
        images: images,
        denom: token.coinDenom,
        channel: token.channel,
        minCoinDenom:
          token.minCoinDenom === "EVMOS" ? "aevmos" : token.minCoinDenom,
        cosmosDenom: token.cosmosDenom,
        category: token.category === "none" ? null : token.category,
        type: token.type === "IBC" ? "IBC" : "ERC20",
        decimals: Number(token.exponent),
        erc20Address: token.erc20Address,
      };
    })
  )) as [Token, ...Token[]];
}

export const generateChainConfigs = async () => {
  const chains: Record<string, Chain> = {};
  const tokensByPrefix = groupBy(
    Object.values(tokenRegistry),
    ({ coinSourcePrefix }) => coinSourcePrefix
  );

  for (const chain of Object.values(chainRegistry)) {
    const { prefix } = chain;
    logger.info(prefix, `Generating chain config for ${prefix}`);
    const tokens = tokensByPrefix[prefix] ?? [];
    logger.info(prefix, `Generating tokens`);
    const currencies = await generateTokens(tokens);
    if (!chain.configurations) {
      logger.error(prefix, "No configurations found in chain registry");
      continue;
    }

    for (const configuration of chain.configurations) {
      const { chainName, configurationType } = configuration;
      let name = chainName;

      let key = prefix;
      let evmId = null;

      if (prefix === "evmos") {
        evmId = configurationType === "mainnet" ? 9001 : 9000;
      }

      if (configurationType === "testnet") {
        name = `${name} Testnet`;
        key = `${key}Testnet`;
      }

      const firstCurrency = configuration.currencies[0];
      if (!firstCurrency) {
        logger.error(
          prefix,
          `No tokens found for ${prefix} ${configurationType}`
        );
        continue;
      }

      const nativeCurrency = currencies.find(({ denom, minCoinDenom }) => {
        return (
          denom === firstCurrency.coinDenom ||
          minCoinDenom === firstCurrency.coinMinDenom
        );
      })?.denom;

      if (!nativeCurrency) {
        logger.error(
          prefix,
          `No native currency for ${prefix} ${configurationType}`
        );
        continue;
      }

      const cosmosRest = normalizeNetworkUrls(configuration.rest);
      if (!cosmosRest) {
        logger.error(
          prefix,
          `No cosmos rest for ${prefix} ${configurationType}`
        );
        continue;
      }

      chains[key] = {
        prefix,
        name,
        cosmosId: configuration.chainId,
        evmId,
        gasPriceStep: chain.gasPriceStep,
        nativeCurrency,
        currencies,
        clientId: configuration.clientId || null,
        source:
          prefix === "evmos"
            ? null
            : {
                sourceChannel: configuration.source.sourceChannel,
                destinationChannel: configuration.source.destinationChannel,
                sourceIBCDenomToEvmos:
                  configuration.source.sourceIBCDenomToEvmos,
                tendermintRest: normalizeNetworkUrls(
                  configuration.source.jsonRPC
                ),
              },
        cosmosRest,
        cosmosGRPC: normalizeNetworkUrls(configuration.rpc),
        evmRest: normalizeNetworkUrls(configuration.web3),
        tendermint: normalizeNetworkUrls(configuration.jrpc),
      };
    }
  }
  return chains;
};
