import { glob } from "glob";
import { mkdir, readFile, writeFile } from "fs/promises";
import { ChainRegistry } from "./types/chain";
import { TokenRegistry } from "./types/token";
import { groupBy } from "lodash-es";
import { fileHeader } from "./constants";

const readFiles = async <T>(globPattern: string) => {
  const files = await glob(globPattern);
  const contents = await Promise.all(
    files //
      .map((file) => readFile(file, { encoding: "utf-8" }))
  );
  const parsed = contents //
    .map((content) => JSON.parse(content) as T);
  return parsed;
};

export const readRegistryChain = async () =>
  (
    await readFiles<ChainRegistry>(
      "node_modules/chain-token-registry/chainConfig/*.json"
    )
  ).flatMap(({ configurations, ...rest }) =>
    configurations
      ? configurations.map((configuration) => ({
          ...rest,
          configuration,
        }))
      : []
  );

export const readRegistryToken = () =>
  readFiles<TokenRegistry>(
    "node_modules/chain-token-registry/tokens/*.json"
  );

const normalizeNetworkUrls = (urls?: string[]) => {
  if (!urls) {
    return null;
  }
  const http = urls.filter(Boolean);
  if (http.length === 0) {
    return null;
  }
  return http;
};

const tokenByPrefix = groupBy(
  await readRegistryToken(),
  ({ coinSourcePrefix }) => coinSourcePrefix
);

// This might be handy when we start supporting IBC between other chains
// const fetchChainOnCosmosRegistry = async (id: string) => {
//   if (id === "gravity") {
//     id = "gravitybridge";
//   }
//   const response = await fetch(
//     `https://raw.githubusercontent.com/cosmos/chain-registry/master/${id}/chain.json`
//   );
//   const json = await response.json();
//   return json as CosmosRegistryChain;
// };

await mkdir("src/chains", { recursive: true });

const chains = await readRegistryChain();

for (const chainRegistry of chains) {
  if (chainRegistry.prefix === "kujira") {
    // TODO: We need to add Kujira fee token to our registry
    continue;
  }
  const tokens = tokenByPrefix[chainRegistry.prefix]?.map(
    (token) => {
      return {
        name: token.name,
        ref: `${chainRegistry.prefix}:${token.coinDenom}`,
        description: token.description,
        symbol: token.coinDenom,
        denom: token.coinDenom,
        sourcePrefix: chainRegistry.prefix,
        sourceDenom:
          chainRegistry.prefix === "evmos"
            ? token.cosmosDenom
            : token.ibc.sourceDenom,
        // TODO: minCoinDenom for evmos is wrong in our registry, we should fix that there
        minCoinDenom:
          token.minCoinDenom === "EVMOS"
            ? "aevmos"
            : token.minCoinDenom,
        category:
          token.category === "none" ? null : token.category,
        type: token.type === "IBC" ? "IBC" : "ERC20",
        decimals: Number(token.exponent),
        erc20Address: token.erc20Address,
        handledByExternalUI:
          token.handledByExternalUI ?? null,
      };
    }
  );

  const configuration = chainRegistry.configuration;

  const isTestnet =
    configuration.configurationType === "testnet";
  const identifier = configuration.identifier.toLowerCase();

  const chain = {
    prefix: chainRegistry.prefix,
    name: configuration.chainName,
    cosmosId: configuration.chainId,
    identifier,
    gasPriceStep: chainRegistry.gasPriceStep,
    evmId:
      chainRegistry.prefix !== "evmos"
        ? null
        : isTestnet
        ? 9000
        : 9001,
    channels:
      // TODO: When we start supporting IBC between other chains, we need to add the proper channels here
      chainRegistry.prefix !== "evmos" &&
      configuration.source
        ? {
            evmos: {
              channelId: configuration.source.sourceChannel,
              counterpartyChannelId:
                configuration.source.destinationChannel,
            },
          }
        : null,

    // Naively assume the first token is the fee token, we should probably add this to our registry
    feeToken:
      configuration.currencies[0].coinMinDenom ??
      // @ts-expect-error TODO: Injective coinMinDenom key is wrong in our registry, we should fix that there
      configuration.currencies[0].coinMinimalDenom ??
      null,
    cosmosRest: [
      `https://rest.cosmos.directory/${identifier}`,
      ...(normalizeNetworkUrls(configuration.rest) ?? []),
    ],
    tendermintRest: [
      `https://rpc.cosmos.directory/${identifier}`,
      ...(normalizeNetworkUrls(configuration.rpc) ?? []),
    ],
    evmRest: normalizeNetworkUrls(configuration.web3),
    cosmosGRPC: normalizeNetworkUrls(configuration.rpc),
    evmRPC: normalizeNetworkUrls(configuration.rpc),
    tokens,
    explorerUrl: configuration.explorerTxUrl,
  };
  await writeFile(`src/chains/${chain.prefix}.ts`, [
    fileHeader,
    `export default ${JSON.stringify(
      chain,
      null,
      2
    )} as const;`,
  ]);
}

await writeFile("src/chains/index.ts", [
  fileHeader,
  chains
    .filter(({ prefix }) => prefix !== "kujira")
    .map(
      ({ prefix }) =>
        `export { default as ${prefix} } from "./${prefix}";`
    )
    .join("\n"),
]);
