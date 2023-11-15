"use client";
import { QueryClient } from "@tanstack/react-query";
import { StoreType, store } from "@evmosapps/evmos-wallet/src/redux/Store";
import { WalletProvider } from "@evmosapps/evmos-wallet/src/wallet/components/WalletProvider";
import { PropsWithChildren, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { MixpanelProvider } from "tracker";
import { MavaWidget } from "@evmosapps/ui-helpers";
import { Snackbars, getAllSnackbars } from "@evmosapps/evmos-wallet";
import { GiveFeedback } from "../../components/GiveFeedback";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

function SnackbarsInternal() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));
  const dispatch = useDispatch();
  return <Snackbars valueRedux={valueRedux} dispatch={dispatch} />;
}

export const RootProviders = ({ children }: PropsWithChildren) => {
  const [{ queryClient, persister }] = useState(() => ({
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
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <ReactQueryStreamedHydration>
          <WalletProvider>
            <MixpanelProvider
              config={{ ip: false }}
              token={process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? ""}
            >
              {children}

              <SnackbarsInternal />
              <MavaWidget />
              <GiveFeedback />
            </MixpanelProvider>
          </WalletProvider>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-left"
          />
        </ReactQueryStreamedHydration>
      </PersistQueryClientProvider>
    </Provider>
  );
};
