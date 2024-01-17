import { z } from "zod";

import { fetchTokenPrices } from "./procedures/tokens/queries/token-prices/server";
import { publicProcedure, router } from "./server";

import { legacyFetchERC20ModuleBalance } from "./procedures/legacy/queries/legacy-erc20modules";

import { fetchAccountBalances } from "./procedures/account/account-balances/server";
import { AddressSchema } from "helpers/src/crypto/addresses/address-schema";
import { fetchTokenPriceByDenom } from "./procedures/tokens/queries/token-price-by-denom/server";
import { fetchChainCosmosRestMetrics } from "./procedures/metrics/queries/cosmos-chain-rest-metrics/server";
import { fetchEVMJsonRpcMetrics } from "./procedures/metrics/queries/evm-json-rpc-metrics/server";
import { fetchPreferredCosmosRestUrl } from "./procedures/metrics/queries/preferred-cosmos-rest/server";
import { fetchPreferredEvmJsonRpcUrl } from "./procedures/metrics/queries/preferred-evm-json-rpc/server";
import { fetchTokens } from "./procedures/tokens/queries/server";
import { fetchChains } from "./procedures/chains/queries/server";
import { fetchChainByRef } from "./procedures/chains/queries/chain-by-ref/server";

import { fetchAccountBalanceByDenom } from "./procedures/account/account-balance-by-denom/server";
import { fetchTokenByDenom } from "./procedures/tokens/queries/token-by-denom/server";

export const appRouter = router({
  tokens: publicProcedure.query(() => fetchTokens()),
  tokenByDenom: publicProcedure
    .input(z.string())
    .query((opts) => fetchTokenByDenom(opts.input)),
  chains: publicProcedure.query(() => fetchChains()),
  chainByRef: publicProcedure
    .input(z.string())
    .query((opts) => fetchChainByRef(opts.input)),
  tokenPrices: publicProcedure.query(() => fetchTokenPrices()),
  tokenPriceByDenom: publicProcedure
    .input(z.string())
    .query((opts) => fetchTokenPriceByDenom(opts.input)),

  legacyERC20ModuleBalance: publicProcedure.query(
    legacyFetchERC20ModuleBalance
  ),

  accountBalance: publicProcedure
    .input(
      z.object({
        chain: z.string(),
        address: AddressSchema,
      })
    )
    .query((opts) => fetchAccountBalances(opts.input)),

  accountBalanceByDenom: publicProcedure
    .input(
      z.object({
        chain: z.string(),
        address: AddressSchema,
        denom: z.string(),
      })
    )
    .query((opts) => fetchAccountBalanceByDenom(opts.input)),

  chainCosmosRestMetrics: publicProcedure
    .input(z.string())
    .query((opts) => fetchChainCosmosRestMetrics(opts.input)),
  evmJsonRpcMetrics: publicProcedure
    .input(z.string())
    .query((opts) => fetchEVMJsonRpcMetrics(opts.input)),
  preferredEVMJsonRpcUrl: publicProcedure
    .input(z.string())
    .query((opts) => fetchPreferredEvmJsonRpcUrl(opts.input)),

  preferredCosmosRestUrl: publicProcedure
    .input(z.string())
    .query((opts) => fetchPreferredCosmosRestUrl(opts.input)),
});

export type AppRouter = typeof appRouter;
