import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";

export const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
  });
