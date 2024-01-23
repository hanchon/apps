// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import dynamic from "next/dynamic";

export const LazyCopilotCard = dynamic(
  () => import("./copilot-card").then((mod) => mod.CopilotCard),
  { ssr: false },
);
