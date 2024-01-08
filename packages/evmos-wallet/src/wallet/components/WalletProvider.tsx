"use client";
import { useEffect, PropsWithChildren, useLayoutEffect } from "react";
import {
  useAccount,
  useAccountEffect,
  useConnect,
  useDisconnect,
  useReconnect,
} from "wagmi";
import { usePubKey } from "../wagmi";
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
import { useWatch } from "helpers";

type WalletProviderProps = PropsWithChildren<{}>;

function Provider({ children }: WalletProviderProps) {
  const { reconnect } = useReconnect();

  const { address, connector, isConnected } = useAccount();

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
  useLayoutEffect(() => {
    reconnect();
  }, [reconnect]);

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
