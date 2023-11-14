"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useTransakEvents } from "../useTransakEvents";
import { useAccount } from "wagmi";

export const TRANSAK_API_KEY = process.env.NEXT_PUBLIC_TRANSAK_API_KEY ?? "";

export default function Transak() {
  const { address } = useAccount();
  useTransakEvents();

  return (
    <div
      data-testid="transak-widget"
      className="relative mx-5 w-full h-full"
      //   TODO: this styles is for copilot, create a component for this on copilot
      //   className="relative mx-auto mt-[25px] h-[700px] w-[300px] overflow-hidden rounded-[15px] md:h-[545px] md:w-[400px]"
    >
      <iframe
        // eslint-disable-next-line no-secrets/no-secrets
        src={`https://global.transak.com?apiKey=${TRANSAK_API_KEY}&themeColor=ed4e33&cryptoCurrencyCode=EVMOS&network=evmos&defaultPaymentMethod=credit_debit_card&disableWalletAddressForm=true&walletAddress=${address}`}
        allow="camera;microphone;fullscreen;payment"
        style={{ height: "100%", width: "100%", border: "none" }}
      ></iframe>
    </div>
  );
}
