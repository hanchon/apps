// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Provider, useDispatch, useSelector } from "react-redux";

import {
  store,
  StoreType,
  Snackbars,
  getAllSnackbars,
  WalletProvider,
} from "evmos-wallet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container, MavaWidget, TermOfServices } from "ui-helpers";
import MainContainer from "../components/mission/MainContainer";
import { HeadComponent } from "../components/mission/HeadComponent";
import { GoogleAnalytics } from "../components/mission/GoogleAnalytics";
import { MixpanelProvider } from "tracker";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GiveFeedback } from "../components/mission/GiveFeedback";
import { greyCliff, ibm, nb } from "ui-helpers";
import { cn } from "helpers";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
      // Will be passed to the page component as props
    },
  };
}

function SnackbarsInternal() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));
  const dispatch = useDispatch();
  return <Snackbars valueRedux={valueRedux} dispatch={dispatch} />;
}

const queryClient = new QueryClient();

export default function Mission() {
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
                <TermOfServices />
                <GiveFeedback />
                <Container>
                  <>
                    <SnackbarsInternal />
                    <MavaWidget />
                    <MainContainer />
                  </>
                </Container>
              </main>
            </>
          </MixpanelProvider>
        </WalletProvider>
      </QueryClientProvider>
    </Provider>
  );
}
