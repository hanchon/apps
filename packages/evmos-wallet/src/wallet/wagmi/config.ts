// import { configureChains, createConfig } from "wagmi";
// import { publicProvider } from "wagmi/providers/public";
// import {
//   keplrConnector,
//   metamaskConnector,
//   safeConnector,
//   walletConnectConnector,
// } from "./connectors";
import { createConfig, createConnector, http } from "wagmi";
import { getEvmosChainInfo } from "./chains";
import { metaMask, safe, walletConnect } from "wagmi/connectors";
import { WALLET_CONNECT_PROJECT_ID } from "../../internal/wallet/functionality/networkConfig";

const evmos = getEvmosChainInfo();
// const { publicClient } = configureChains(
//   [getEvmosChainInfo()],
//   [publicProvider()]
// );
// export const evmosClient = publicClient({
//   chainId: evmos.id,
// });
// export const wagmiConfig = createConfig({
//   autoConnect: false,
//   connectors: [
//     ...(safeConnector.ready
//       ? [safeConnector]
//       : [metamaskConnector, walletConnectConnector, keplrConnector]),
//   ],
//   publicClient,
// });

export const wagmiConfig = createConfig({
  chains: [evmos],
  transports: {
    [evmos.id]: http(),
  },
  connectors: [
    metaMask(),
    walletConnect({
      showQrModal: process.env.NODE_ENV !== "test",
      projectId: WALLET_CONNECT_PROJECT_ID,
    }),
    safe({
      debug: false,
    }),
  ],
});
