import type { AppRouter } from "./router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { transformer } from "./transformer";
export const trpc = createTRPCProxyClient<AppRouter>({
  transformer,

  links: [httpBatchLink({ url: "/api/trpc", fetch })],
});
