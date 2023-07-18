// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  changeNetworkToEvmosMainnet,
  getWallet,
  isMetamaskInstalled,
  isEvmosChain,
  connectHandler,
  queryPubKey,
  isWalletSelected,
} from "evmos-wallet";
import { STEP_STATUS } from "./buttons/utils";
import {
  CLICK_ON_CONNECT_ACCOUNT_COPILOT,
  CLICK_ON_INSTALL_ACCOUNT_COPILOT,
  SUCCESSFUL_WALLET_CONNECTION_COPILOT,
  SUCCESSFUL_WALLET_INSTALLATION_COPILOT,
  UNSUCCESSFUL_WALLET_CONNECTION_COPILOT,
  UNSUCCESSFUL_WALLET_INSTALLATION_COPILOT,
} from "tracker";

const metamaskDownloadUrl = "https://metamask.io/download/";

const getWalletLocal = async () => {
  // get wallet returns null or string but
  // the step actions need to return a boolean
  const wallet = await getWallet();
  if (wallet === null) {
    return false;
  }

  return true;
};

const signPubkey = async () => {
  const wallet = await getWallet();
  if (wallet === null) {
    return false;
  }

  return await connectHandler([wallet]);
};

const checkConnectionMetamask = async () => {
  const ethChain = await isEvmosChain();
  if (!ethChain) {
    return false;
  }
  // avoid showing the pop up if the user didn't connect the wallet yet
  const walletSelected = isWalletSelected();
  if (!walletSelected) {
    return false;
  }

  // get the wallet to query the pubkey
  const account = await getWallet();
  if (account === null) {
    return false;
  }

  // only show metamask connected if the pubkey is setted
  const pubkey = await queryPubKey("https://rest.bd.evmos.org:1317", account);
  if (pubkey === null) {
    return false;
  }

  return true;
};

const connectMetaMask = (href: string) => {
  if (!isMetamaskInstalled()) {
    window.open(href, "_blank");
    return false;
  }
  return true;
};

export const stepsSetAccount = [
  {
    id: "install",
    buttonText: "Install MetaMask",
    checkAction: () => isMetamaskInstalled(),
    loadingText: ["Waiting for MetaMask Setup"],
    doneText: "Metamask Installed",
    actions: [() => connectMetaMask(metamaskDownloadUrl)],
    href: metamaskDownloadUrl,
    status: STEP_STATUS.CURRENT,
    tracker: {
      init: CLICK_ON_INSTALL_ACCOUNT_COPILOT,
      provider: "MetaMask",
      successful: SUCCESSFUL_WALLET_INSTALLATION_COPILOT,
      unsuccessful: UNSUCCESSFUL_WALLET_INSTALLATION_COPILOT,
    },
  },

  {
    id: "connect",
    buttonText: "Connect with MetaMask",
    checkAction: () => checkConnectionMetamask(),
    loadingText: [
      "Approve on Metamask",
      "",
      "Select accounts and press Connect",
      "Press Sign",
    ],
    actions: [
      () => changeNetworkToEvmosMainnet(),
      () => isEvmosChain(),
      () => getWalletLocal(),
      () => signPubkey(),
    ],
    errorsText: [
      "Approval Rejected, please try again",
      "You need to switch the network to Evmos, please try again",
      "Get accounts rejected, please try again",
      "Sign rejected, please try again",
    ],
    doneText: "Metamask Connected",
    status: STEP_STATUS.NOT_PROCESSED,
    tracker: {
      init: CLICK_ON_CONNECT_ACCOUNT_COPILOT,
      provider: "MetaMask",
      successful: SUCCESSFUL_WALLET_CONNECTION_COPILOT,
      unsuccessful: UNSUCCESSFUL_WALLET_CONNECTION_COPILOT,
    },
  },
];
