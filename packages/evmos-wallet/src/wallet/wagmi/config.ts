import { createConfig, http } from "wagmi";
import {
  evmosLocalnet,
  evmosMainet,
  evmosTestnet,
  getEvmosChainInfo,
} from "./chains";
import { injected, safe, walletConnect } from "wagmi/connectors";
import { WALLET_CONNECT_PROJECT_ID } from "../../internal/wallet/functionality/networkConfig";
import { keplr } from "./keplrConnector";

const evmos = getEvmosChainInfo();

export const wagmiConfig = createConfig({
  chains: [evmosMainet, evmosTestnet, evmosLocalnet],

  transports: {
    [evmos.id]: http(),
    [evmosTestnet.id]: http(),
    [evmosLocalnet.id]: http(),
  },
  ssr: true,
  multiInjectedProviderDiscovery: false,

  connectors: [
    injected({ target: "metaMask" }),
    keplr,
    walletConnect({
      showQrModal: process.env.NODE_ENV !== "test",
      projectId: WALLET_CONNECT_PROJECT_ID,
    }),
    safe({
      debug: false,
    }),
  ],
});

export type ConnetorId = "MetaMask" | "WalletConnect" | "Keplr" | "Safe";
