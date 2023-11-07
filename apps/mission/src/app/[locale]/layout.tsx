import "../../globals.css";
import { dir } from "i18next";
import { PropsWithChildren } from "react";
import { languages } from "@evmosapps/i18n";
import { withLocale } from "@evmosapps/i18n/server";
import { cn } from "helpers";
import { greyCliff, ibm, nb } from "ui-helpers/src/fonts";
import { RootProviders } from "./RootProviders";
import { GoogleAnalytics } from "../../components/mission/GoogleAnalytics";
import { ConsentModal } from "stateful-components/src/modals/ConsentModal/ConsentModal";
import { TermsOfServicesModal } from "stateful-components/src/modals/TermsOfServices/TermsOfServices";
import { ConnectModal } from "stateful-components/src/modals/ConnectModal/ConnectModal";
import { Copilot } from "stateful-components/src/modals/CopilotModal/CopilotModal";
import { ProfileModal } from "stateful-components/src/modals/ProfileModal/ProfileModal";
import { TopupModal } from "stateful-components/src/modals/TopupModal/TopupModal";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";

export async function generateStaticParams() {
  return languages.map((locale) => ({ lng: locale }));
}

function RootLayout({
  children,
  params: { locale },
}: PropsWithChildren<{ params: { locale: string } }>) {
  return (
    <html lang={locale} dir={dir(locale)} className="dark">
      <head />
      <body className={cn(greyCliff.variable, ibm.variable, nb.variable)}>
        <RootProviders>
          <main className="flex flex-col dark:text-white">
            <Header />
            <div className="container mx-auto">{children}</div>
            <Footer />
          </main>
          <ConsentModal />
          <ConnectModal />
          <ProfileModal />
          <Copilot />
          <TopupModal />
          <TermsOfServicesModal />
          <GoogleAnalytics />
        </RootProviders>
      </body>
    </html>
  );
}

export default withLocale(RootLayout);
