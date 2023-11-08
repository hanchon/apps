import localFont from "next/font/local";
import { IBM_Plex_Sans } from "next/font/google";

export const greyCliff = localFont({
  variable: "--font-body",
  src: [
    {
      path: "./greycliff/GreycliffCF-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./greycliff/GreycliffCF-Bold.otf",
      weight: "600",
    },
    {
      path: "./greycliff/GreycliffCF-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./greycliff/GreycliffCF-Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
});

export const ibm = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-display",
});

export const evmos = localFont({
  variable: "--font-evmos",
  src: [
    {
      path: "./evmos/EvmosDisplay-ExtraBold.otf",
      weight: "700",
    },
    {
      path: "./evmos/EvmosDisplay-Regular.otf",
      weight: "400",
    },
  ],
});

export const nb = localFont({
  variable: "--font-brand",
  src: [
    {
      path: "./nb/NBInternationalProBol.otf",
      weight: "700",
    },
    {
      path: "./nb/NBInternationalProReg.otf",
      weight: "400",
    },
    {
      path: "./nb/NBInternationalProLig.otf",
      weight: "300",
    },
  ],
});
