import { createConfig, http } from "wagmi";
import { getEvmosChainInfo } from "./chains";
import { metaMask, safe, walletConnect } from "wagmi/connectors";
import { WALLET_CONNECT_PROJECT_ID } from "../../internal/wallet/functionality/networkConfig";
import { keplr } from "./keplrConnector";

const evmos = getEvmosChainInfo();

export const wagmiConfig = createConfig({
  chains: [evmos],
  transports: {
    [evmos.id]: http(),
  },
  ssr: true,
  connectors: [
    metaMask(),

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

export const CONNECTOR_IDS = wagmiConfig.connectors.map(
  (c) => c.name
) as ConnetorId[];
export type ConnetorId = "MetaMask" | "WalletConnect" | "Keplr" | "Safe";
