import { createConfig, http } from "wagmi";

import { injected, safe, walletConnect } from "wagmi/connectors";
import { WALLET_CONNECT_PROJECT_ID } from "../../internal/wallet/functionality/networkConfig";
import { keplr } from "./keplrConnector";
import {
  evmoslocalnet,
  evmosmainnet,
  evmostestnet,
} from "helpers/src/evmos-info";

export const wagmiConfig = createConfig({
  chains: [evmosmainnet, evmostestnet, evmoslocalnet],

  transports: {
    [evmosmainnet.id]: http(),
    [evmostestnet.id]: http(),
    [evmoslocalnet.id]: http(),
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
