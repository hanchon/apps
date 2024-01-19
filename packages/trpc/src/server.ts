// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { initTRPC } from "@trpc/server";
import { transformer } from "./transformer";

const t = initTRPC.create({
  transformer,
  isServer: true,
  isDev: process.env.NODE_ENV === "development",
});

export const router = t.router;
export const publicProcedure = t.procedure;
