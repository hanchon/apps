import * as chains from "wagmi/chains";

export const evmos = {
  ...chains.evmos,
  cosmosId: "evmos_9001-2",
};

export const evmosTestnet = {
  ...chains.evmosTestnet,
  cosmosId: "evmos_9000-4",
};

export function getEvmosChainInfo() {
  return evmosTestnet;
}
