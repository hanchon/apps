// import { z } from "zod";

import { fetchChains } from "@evmosapps/registry/src/fetch-chains";
import { fetchTokenPrices } from "./procedures/fetch-token-prices";
import { publicProcedure, router } from "./server";
import { fetchTokens } from "@evmosapps/registry/src/fetch-tokens";
import { fetchLegacyERC20ModuleBalance } from "./procedures/legacy-erc20modules";

export const appRouter = router({
  tokens: publicProcedure.query(() => {
    return fetchTokens().then(({ tokens }) => tokens);
  }),
  chains: publicProcedure.query(() => {
    return fetchChains().then(({ chains }) => chains);
  }),
  tokenPrices: publicProcedure.query(() => {
    return fetchTokenPrices();
  }),
  fetchLegacyERC20ModuleBalance: publicProcedure.query(
    fetchLegacyERC20ModuleBalance
  ),
});

export type AppRouter = typeof appRouter;
