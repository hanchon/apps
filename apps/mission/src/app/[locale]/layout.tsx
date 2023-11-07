import "../../globals.css";
import { dir } from "i18next";
import { PropsWithChildren } from "react";
import { languages } from "@evmosapps/i18n";
import { withLocale } from "@evmosapps/i18n/server";
import { cn } from "helpers";
import { greyCliff, ibm, nb } from "ui-helpers/src/fonts";
import { RootProviders } from "./RootProviders";
import { GoogleAnalytics } from "../../components/mission/GoogleAnalytics";
import { ConsentModal } from "../../components/modals/ConsentModal/ConsentModal";
import { TermsOfServicesModal } from "../../components/modals/TermsOfServices/TermsOfServices";
import { ConnectModal } from "../../components/modals/ConnectModal/ConnectModal";
import { Copilot } from "../../components/modals/CopilotModal/CopilotModal";
import { ProfileModal } from "../../components/modals/ProfileModal/ProfileModal";
import { TopupModal } from "../../components/modals/TopupModal/TopupModal";
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
          <main>
            <Header />
            <div className="container mx-auto text-white">{children}</div>
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
