import * as chains from "wagmi/chains";
import { EVMOS_CHAIN } from "../../internal/wallet/functionality/networkConfig";
import { Chain } from "viem";

export const evmos: Chain & {
  cosmosId: string;
} = {
  ...chains.evmos,
  cosmosId: "evmos_9001-2",
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
    },
  },
};

export const evmosTestnet: Chain & {
  cosmosId: string;
} = {
  ...chains.evmosTestnet,
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
