"use client";
import { useEffect, PropsWithChildren, useLayoutEffect } from "react";
import {
  useAccount,
  useAccountEffect,
  useConnect,
  useDisconnect,
  useReconnect,
} from "wagmi";
import { usePubKey, wagmiConfig } from "../wagmi";
import {
  WALLET_NOTIFICATIONS,
  notifyError,
  notifySuccess,
} from "../../internal/wallet/functionality/errors";
import { truncateAddress } from "../../internal/wallet/style/format";
import { getActiveProviderKey, normalizeToEvmos, store } from "../..";
import { resetWallet, setWallet } from "../redux/WalletSlice";
import {
  RemoveWalletFromLocalStorage,
  SaveProviderToLocalStorate,
} from "../../internal/wallet/functionality/localstorage";
import { useEffectEvent, useWatch } from "helpers";

type WalletProviderProps = PropsWithChildren<{}>;

function Provider({ children }: WalletProviderProps) {
  const { reconnect } = useReconnect();
  const { address, connector, isConnected } = useAccount();

  /**
   * I would expect that the behavior of reconnect would be to only reconnect if there was a previous connection
   * however, even when you don't have a recent connection, it reconnects to the first in the list
   * I'm not sure if that's a bug or not, but this is a workaround for now
   */
  const reconnectIfRecent = useEffectEvent(async () => {
    const recentId = await wagmiConfig.storage?.getItem("recentConnectorId");
    if (!recentId) return;
    reconnect();
  });
  useLayoutEffect(() => {
    void reconnectIfRecent();
  }, [reconnectIfRecent]);

  useAccountEffect({
    onConnect: ({ connector, address, isReconnected }) => {
      if (isReconnected) {
        return;
      }

      notifySuccess(
        WALLET_NOTIFICATIONS.SuccessTitle,
        "Connected with wallet {address}",
        {
          walletName: connector?.name ?? "",
          address: truncateAddress(address) ?? "",
        }
      );
    },

    onDisconnect() {
      RemoveWalletFromLocalStorage();
      store.dispatch(resetWallet());
    },
  });
  const { variables } = useConnect();
  const { disconnect } = useDisconnect();
  const { pubkey, error: pubkeyError, isFetching } = usePubKey();

  useEffect(() => {
    const connectorId = connector?.id.toLowerCase();
    if (
      !connectorId ||
      !address ||
      (!pubkey && getActiveProviderKey() !== "Safe")
    )
      return;
    /**
     * TODO: this is to sync with the current wallet redux store
     * In a future PR I intent to remove this store
     * and use wagmi to get the wallet data
     */
    SaveProviderToLocalStorate(connectorId);
    store.dispatch(
      setWallet({
        active: true,
        extensionName: connectorId,
        evmosAddressEthFormat: address,
        evmosAddressCosmosFormat: normalizeToEvmos(address),
        evmosPubkey: pubkey ?? "",
        osmosisPubkey: null,
        accountName: null,
      })
    );
  }, [isConnected, connector, pubkey, address]);

  useWatch(() => {
    if (getActiveProviderKey() === "Safe") return;
    if (!pubkeyError || isFetching) return;

    disconnect();

    // disconnect();
    notifyError(
      WALLET_NOTIFICATIONS.ErrorTitle,
      WALLET_NOTIFICATIONS.PubkeySubtext,
      { walletName: variables?.connector?.name ?? "" }
    );
  }, [isFetching]);
  return <>{children}</>;
}

export function WalletProvider(props: WalletProviderProps) {
  return <Provider {...props} />;
}
