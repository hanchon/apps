"use client";
import dynamic from "next/dynamic";

export const LazyCopilotCard = dynamic(
  () => import("./copilot-card").then((mod) => mod.CopilotCard),
  { ssr: false },
);
