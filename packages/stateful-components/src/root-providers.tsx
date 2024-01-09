"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreType, store } from "@evmosapps/evmos-wallet/src/redux/Store";
import { WalletProvider } from "@evmosapps/evmos-wallet/src/wallet/components/WalletProvider";
import { PropsWithChildren, useMemo, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { MavaWidget } from "@evmosapps/ui-helpers";
import { Snackbars, wagmiConfig } from "@evmosapps/evmos-wallet";
// import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GiveFeedback } from "./give-feedback";
import { WagmiProvider } from "wagmi";

function SnackbarsInternal() {
  const snackbars = useSelector(
    (state: StoreType) => state.snackbar.value.snackbars
  );

  useMemo(() => {
    return [...snackbars].sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      } else if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
  }, [snackbars]);
  const dispatch = useDispatch();
  return <Snackbars valueRedux={snackbars} dispatch={dispatch} />;
}

export const RootProviders = ({ children }: PropsWithChildren) => {
  const [{ queryClient }] = useState(() => ({
    queryClient: new QueryClient({
      defaultOptions: {
        queries: {
          gcTime: 1000 * 60 * 60 * 24, // 24 hours
        },
      },
    }),

    persister: createSyncStoragePersister({
      storage: typeof window === "undefined" ? undefined : window.localStorage,
    }),
  }));
  return (
    <Provider store={store}>
      <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
        <QueryClientProvider client={queryClient}>
          {/* <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}
        > */}
          <WalletProvider>
            {children}

            <SnackbarsInternal />
            <MavaWidget />
            <GiveFeedback />
          </WalletProvider>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-left"
          />
          {/* </PersistQueryClientProvider> */}
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  );
};
