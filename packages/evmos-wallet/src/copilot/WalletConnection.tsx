// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, useEffect, useRef, useState } from "react";
import { useActivateWalletConnect } from "../internal/wallet/functionality/walletconnect/walletconnect";
import { store } from "../redux/Store";
import {
  KEPLR_KEY,
  METAMASK_KEY,
  WalletExtension,
} from "../internal/wallet/functionality/wallet";
import { AnyAction } from "redux";
import {
  GetProviderFromLocalStorage,
  RemoveProviderFromLocalStorage,
} from "../internal/wallet/functionality/localstorage";
import { Metamask } from "../internal/wallet/functionality/metamask/metamask";
import { Keplr } from "../internal/wallet/functionality/keplr/keplr";
import { SWITCH_BETWEEN_WALLETS, useTracker } from "tracker";
import { SetStateAction } from "react";
import {
  handleWalletInLocalStorage,
  trackWallet,
  drawWalletProfileModal,
  drawConnectModal,
} from "./utils";

export const WalletConnection = ({
  walletExtension,
  dispatch,
  copilotModal,
}: {
  walletExtension: WalletExtension;
  dispatch: Dispatch<AnyAction>;
  copilotModal?: ({
    beforeStartHook,
  }: {
    beforeStartHook: Dispatch<SetStateAction<boolean>>;
  }) => JSX.Element;
}) => {
  const [show, setShow] = useState(false);

  useActivateWalletConnect(store, true, walletExtension.extensionName);

  // Restore wallet connection on first load if exists
  const firstUpdate = useRef(true);

  useEffect(() => {
    // Execute the hook only once
    if (firstUpdate.current === false) {
      return;
    }

    // Read the localstorage info to reload the provider
    async function ReloadProvider() {
      const provider = GetProviderFromLocalStorage();
      if (provider === METAMASK_KEY) {
        const wallet = new Metamask(store);
        await wallet.connect();
      } else if (provider === KEPLR_KEY) {
        const wallet = new Keplr(store);
        await wallet.connect();
      } else {
        // Invalid provider is set, remove it
        RemoveProviderFromLocalStorage();
      }
    }

    // Execute the async function
    // Can not await inside a useEffect
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ReloadProvider();

    // Mark the ref as already executed
    firstUpdate.current = false;
  });

  const { handlePreClickAction: trackChangeWallet } = useTracker(
    SWITCH_BETWEEN_WALLETS
  );

  useEffect(() => {
    // tracking address changes
    if (
      METAMASK_KEY === GetProviderFromLocalStorage() ||
      KEPLR_KEY === GetProviderFromLocalStorage()
    ) {
      trackWallet(walletExtension, trackChangeWallet);
    }
  }, [walletExtension]);

  useEffect(() => {
    handleWalletInLocalStorage(walletExtension);
  }, [walletExtension]);

  return walletExtension.active === true
    ? drawWalletProfileModal({ setShow, walletExtension, show, dispatch })
    : drawConnectModal({ setShow, show, dispatch, copilotModal });
};
