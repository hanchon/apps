import { initTRPC } from "@trpc/server";
import { transformer } from "./transformer";

const t = initTRPC.create({
  transformer,
  isServer: true,
  isDev: process.env.NODE_ENV === "development",
});

export const router = t.router;
export const publicProcedure = t.procedure;
