import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { SafeConnector } from "wagmi/connectors/safe";
import { WALLET_CONNECT_PROJECT_ID } from "../../internal/wallet/functionality/networkConfig";
import { KeplrConnector } from "./keplrConnector";
import { getEvmosChainInfo } from "./chains";
import { metaMask, walletConnect } from "wagmi/connectors";

const evmos = getEvmosChainInfo();

export const walletConnectConnector = new WalletConnectConnector({
  chains: [evmos],
  options: {
    /**
     * Workaround for a bug in wallet connect libraries when bundled by vite
     * https://github.com/WalletConnect/walletconnect-monorepo/issues/3852
     */
    showQrModal: process.env.NODE_ENV !== "test",
    projectId: WALLET_CONNECT_PROJECT_ID,
  },
});

export const metamaskConnector = metaMask();

export const keplrConnector = new KeplrConnector({
  chains: [evmos],
});
export const safeConnector = new SafeConnector({
  chains: [evmos],
  options: { debug: false },
});
void walletConnectConnector.getProvider().then((provider) => {
  // @ts-expect-error: for some reason WalletConnectConnector
  // doesn't allow us to pass
  // the required methods, which breaks metamask
  provider?.rpc?.methods?.push(
    "eth_signTypedData_v4",
    "wallet_addEthereumChain",
    "wallet_switchEthereumChain"
  );
});

export const CONNECTOR_MAP = {
  [keplrConnector.id]: keplrConnector,
  [metamaskConnector.id]: metamaskConnector,
  [walletConnectConnector.id]: walletConnectConnector,
  [safeConnector.id]: safeConnector,
} as const;
