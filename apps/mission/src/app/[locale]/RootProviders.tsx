"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreType, store } from "evmos-wallet/src/redux/Store";
import { WalletProvider } from "evmos-wallet/src/wallet/components/WalletProvider";
import { PropsWithChildren } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { MixpanelProvider } from "tracker";
import { GoogleAnalytics } from "../../components/mission/GoogleAnalytics";
import { MavaWidget, TermOfServices } from "ui-helpers";
import { Snackbars, getAllSnackbars } from "evmos-wallet";
import { GiveFeedback } from "../../components/mission/GiveFeedback";
const queryClient = new QueryClient();
function SnackbarsInternal() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));
  const dispatch = useDispatch();
  return <Snackbars valueRedux={valueRedux} dispatch={dispatch} />;
}

export const RootProviders = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <MixpanelProvider
            config={{ ip: false }}
            token={process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? ""}
          >
            {children}
            {/* <> */}
            {/* <HeadComponent /> */}

            {/* <main */}

            {/* <TermOfServices /> */}
            {/* <GiveFeedback /> */}
            {/* <Container> */}
            {/* <> */}

            {/* <MainContainer /> */}
            {/* </> */}
            {/* </Container> */}
            {/* </main> */}
            {/* </> */}
            <SnackbarsInternal />

            <MavaWidget />
            <GiveFeedback />
          </MixpanelProvider>
        </WalletProvider>
      </QueryClientProvider>
    </Provider>
  );
};
