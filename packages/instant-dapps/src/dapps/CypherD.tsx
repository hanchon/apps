"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";

export const CYPHERD_API_KEY = process.env.NEXT_PUBLIC_CYPHERD_KEY ?? "";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cypher?: any;
  }
}
const CypherD = () => {
  const { address } = useAccount();

  const ref = useRef(false);

  useEffect(() => {
    if (address && !ref.current) {
      ref.current = true;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      window.Cypher({
        address,
        theme: "light",
        targetChainIdHex: "0x2329", // Evmos ChainID
        appId: CYPHERD_API_KEY,
        parentComponentId: "cypher-onboading-sdk", // Id of the <div> tag inside which the widget is needed
      });
    }
  }, [address]);
  return (
    <div // div inside which the widget will be present
      data-testid="cypher-onboading-sdk"
      id="cypher-onboading-sdk" // Id that will be passed to the window.Cypher() call
      className="flex h-full flex-col items-center justify-center"
    ></div>
  );
};

export default CypherD;
