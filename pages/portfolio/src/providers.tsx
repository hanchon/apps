// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  store,
  Snackbars,
  StoreType,
  getAllSnackbars,
  WalletProvider,
} from "evmos-wallet";
import { Container, MavaWidget, TermOfServices } from "ui-helpers";
import { greyCliff, ibm, nb } from "ui-helpers/src/fonts";
import { Provider, useDispatch, useSelector } from "react-redux";
import { StatefulHeader } from "stateful-components";
import { HeadComponent } from "./asset/HeadComponent";
import { GoogleAnalytics } from "./asset/GoogleAnalytics";
import { StatefulFooter } from "stateful-components";
import { MixpanelProvider } from "tracker";
import { GiveFeedback } from "../GiveFeedback";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { createPortal } from "react-dom";
import { TransferModal } from "./modals/transfer/TransferModal";
import { ReceiptModal } from "./modals/receipt/ReceiptModal";
import { RequestModal } from "./modals/request/RequestModal";
import { TopupModal } from "./modals/topup/TopupModal";
import { PayModal } from "./modals/pay/Modal";
import { PropsWithChildren } from "react";
import { cn } from "helpers";

function SnackbarsInternal() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));
  const dispatch = useDispatch();
  return <Snackbars valueRedux={valueRedux} dispatch={dispatch} />;
}
const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <MixpanelProvider
            config={{ ip: false }}
            token={process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? ""}
          >
            <>
              <HeadComponent />
              <GoogleAnalytics />
              <main
                className={cn(greyCliff.variable, ibm.variable, nb.variable)}
              >
                <GiveFeedback />
                <Container>
                  <>
                    <SnackbarsInternal />
                    <StatefulHeader pageName="Portfolio" page="assets" />
                    <MavaWidget />
                    <div className="container mx-auto mb-auto overflow-auto">
                      {children}
                    </div>
                    <StatefulFooter />
                  </>
                </Container>
              </main>
            </>
            <Modals />
          </MixpanelProvider>
        </WalletProvider>
        {typeof document !== "undefined" &&
          createPortal(
            <ReactQueryDevtools initialIsOpen={false} />,
            document.body
          )}
      </QueryClientProvider>
    </Provider>
  );
}
const Modals = () => (
  <>
    <TransferModal />
    <ReceiptModal />
    <RequestModal />
    <TopupModal />
    <PayModal />
    {typeof document !== "undefined" &&
      createPortal(<TermOfServices />, document.body)}
  </>
);
