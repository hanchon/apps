"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useAccount } from "wagmi";

export const C14_API_KEY = process.env.NEXT_PUBLIC_C14_API_KEY ?? "";

export default function C14() {
  const { address } = useAccount();

  return (
    <div
      data-testid="c14-widget"
      className="relative mx-5 w-full h-full"
      //   className="relative mx-auto mt-[25px] h-[700px] w-[300px] overflow-hidden rounded-[15px] md:h-[545px] md:w-[400px]"
    >
      <iframe
        // eslint-disable-next-line no-secrets/no-secrets
        src={`https://pay.c14.money?clientId=${C14_API_KEY}&targetAssetId=e2e0546e-b51b-4d56-9426-3aff3a2418ba&targetAssetIdLock=true&targetAddress=${address}`}
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
}
