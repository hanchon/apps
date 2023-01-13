import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Provider } from "react-redux";
import AssetsTable from "../src/components/asset/table/AssetsTable";
import Container from "../src/components/Container";
import { store } from "../src/redux/Store";
import { WagmiConfig } from "wagmi";
const Web3Modal = dynamic(() =>
  import("@web3modal/react").then((mod) => mod.Web3Modal)
);
import {
  ethereumClient,
  projectId,
  wagmiClient,
} from "../src/internal/wallet/functionality/walletconnect/walletconnectConstants";

const Header = dynamic(() => import("../src/components/Header"));
const TermOfServices = dynamic(
  () => import("../src/components/termsOfServices/TermOfServices")
);
const Snackbars = dynamic(
  () => import("../src/components/notification/Snackbars")
);
const Footer = dynamic(() => import("../src/components/footer/Footer"));

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <>
            <Head>
              <title>Assets Page</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />

              <meta charSet="utf-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <meta
                name="keywords"
                content="assets, evmos, evm, evm on cosmos, fast finality, delegated proof-of-stake"
              />
              {/* <!--  Essential META Tags --> */}
              <meta property="og:title" content="Evmos Assets Page" />
              <meta property="og:type" content="article" />
              <meta property="og:image" content="/social_share.jpg" />
              <meta property="og:url" content="https://assets.evmos.org" />
              <meta name="twitter:card" content="summary_large_image" />

              {/* <!--  Non-Essential, But Recommended --> */}
              <meta
                property="og:description"
                content="EVMOS Assets Page is the official place to withdraw, deposit and convert your evmos assets."
              />
              <meta property="og:site_name" content="Evmos Assets Page" />
              <meta
                name="twitter:image:alt"
                content="EVMOS Assets Page is the official place to withdraw, deposit and convert your evmos assets."
              />
              <meta name="twitter:site" content="@EvmosOrg" />

              <link rel="icon" href="/favicon.ico" />
              {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> */}
              <link rel="manifest" href="/manifest.json" />
            </Head>

            <main>
              <TermOfServices />
              <Container>
                <>
                  <Snackbars />
                  <Header />
                  <div className="container mx-auto overflow-auto mb-auto">
                    <AssetsTable />
                  </div>
                  <Footer />
                </>
              </Container>
            </main>
          </>
        </WagmiConfig>
      </QueryClientProvider>

      <Web3Modal
        projectId={projectId}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ethereumClient={ethereumClient}
      />
    </Provider>
  );
}
