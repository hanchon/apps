import { createConfig, http } from "wagmi";
import { getEvmosChainInfo } from "./chains";
import { injected, safe, walletConnect } from "wagmi/connectors";
import { WALLET_CONNECT_PROJECT_ID } from "../../internal/wallet/functionality/networkConfig";
import { keplr } from "./keplrConnector";

const evmos = getEvmosChainInfo();

// const test = injected({
//   target: () => {
//     if (!window) {
//       return {};
//     }
//     // console.log(window);
//     window.addEventListener("eip6963:announceProvider", (event) => {
//       console.log("eip6963:announceProvider", event.detail);
//     });

//     window.dispatchEvent(new Event("eip6963:requestProvider"));
//   },
// });
export const wagmiConfig = createConfig({
  chains: [evmos],
  transports: {
    [evmos.id]: http(),
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

export const CONNECTOR_IDS = wagmiConfig.connectors.map(
  (c) => c.name
) as ConnetorId[];
export type ConnetorId = "MetaMask" | "WalletConnect" | "Keplr" | "Safe";
