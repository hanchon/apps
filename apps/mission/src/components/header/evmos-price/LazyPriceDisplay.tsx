// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import dynamic from "next/dynamic";

export const LazyPriceDisplay = dynamic(
  () => import("./PriceDisplay").then((mod) => mod.PriceDisplay),
  {
    ssr: false,

    loading: () => (
      <div className="w-[13ch] h-[1lh] bg-gray2/20 rounded-md animate-pulse" />
    ),
  },
);
