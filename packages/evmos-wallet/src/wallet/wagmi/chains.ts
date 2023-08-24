import * as chains from "wagmi/chains";
import { EVMOS_CHAIN } from "../../internal/wallet/functionality/networkConfig";

export const evmos = {
  ...chains.evmos,
  cosmosId: "evmos_9001-2",
};

const _evmosTestnet = {
  id: 9000,
  name: "Evmos Testnet",
  network: "evmos-testnet",
  nativeCurrency: {
      decimals: 18,
      name: "Evmos",
      symbol: "EVMOS",
  },
  rpcUrls: {
      default: {
          http: ["https://evmos-testnet-json.qubelabs.io"],
      },
      public: {
          http: ["https://evmos-testnet-json.qubelabs.io"],
      },
  },
  blockExplorers: {
      default: {
          name: "Evmos Testnet Block Explorer",
          url: "https://evm.evmos.dev/",
      },
  },
};

export const evmosTestnet = {
  ..._evmosTestnet,
  cosmosId: "evmos_9000-4",
};

export function getEvmosChainInfo() {
  return evmosTestnet;
}
