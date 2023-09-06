import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  getAllSnackbars,
  Snackbars,
  store,
  StoreType,
  WalletProvider,
} from "evmos-wallet";
import { Provider, useDispatch, useSelector } from "react-redux";
import { MixpanelProvider } from "tracker";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();
export function RootProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <MixpanelProvider
            config={{ ip: false }}
            token={process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? ""}
          >
            {children}
          </MixpanelProvider>
        </WalletProvider>
      </QueryClientProvider>
    </Provider>
  );
}
