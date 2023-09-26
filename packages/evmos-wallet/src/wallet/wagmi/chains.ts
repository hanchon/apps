import {
  evmos as wagmiEvmos,
  evmosTestnet as wagmiEvmosTestnet,
} from "wagmi/chains";
import { EVMOS_CHAIN } from "../../internal/wallet/functionality/networkConfig";
import { Chain } from "viem";

const lavaRpcUrl =
  // eslint-disable-next-line no-secrets/no-secrets
  "https://g.w.lavanet.xyz:443/gateway/evmos/json-rpc-http/549a760ba95638964be1942980693d34";
export const evmos: Chain & {
  cosmosId: string;
} = {
  ...wagmiEvmos,
  cosmosId: "evmos_9001-2",
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
    },
  },
  rpcUrls: {
    default: { http: [lavaRpcUrl] },
    public: { http: [lavaRpcUrl] },
  },
};

export const evmosTestnet: Chain & {
  cosmosId: string;
} = {
  ...wagmiEvmosTestnet,
  cosmosId: "evmos_9000-4",
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
    },
  },
};

export function getEvmosChainInfo(): Chain & { cosmosId: string } {
  return EVMOS_CHAIN.chainId === evmos.id ? evmos : evmosTestnet;
}
