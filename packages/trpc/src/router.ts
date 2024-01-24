// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

import { fetchTokenPrices } from "./procedures/tokens/queries/price/fetch-token-prices";
import { publicProcedure, router } from "./server";

import { legacyFetchERC20ModuleBalance } from "./procedures/legacy/queries/legacy-erc20modules";

import { fetchAccountBalances } from "./procedures/account/fetch-account-balances";
import { AddressSchema } from "helpers/src/crypto/addresses/address-schema";
import { fetchTokenPriceByDenom } from "./procedures/tokens/queries/fetch-token-price-by-denom";
import { fetchChainCosmosRestMetrics } from "./procedures/metrics/queries/fetch-cosmos-chain-rest-metrics";
import { fetchEVMJsonRpcMetrics } from "./procedures/metrics/queries/fetch-evm-json-rpc-metrics";
import { fetchPreferredCosmosRestUrl } from "./procedures/metrics/queries/fetch-preferred-cosmos-rest-url";
import { fetchPreferredEvmJsonRpcUrl } from "./procedures/metrics/queries/fetch-preferred-evm-json-rpc-url";
import { fetchTokens } from "./procedures/tokens/queries/fetch-tokens";
import { fetchChains } from "./procedures/chains/queries/fetch-chains";
import { fetchChainByRef } from "./procedures/chains/queries/chain-by-ref/fetch-chain-by-ref";

import { fetchAccountBalanceByDenom } from "./procedures/account/fetch-account-balance-by-denom";
import { fetchTokenByDenom } from "./procedures/tokens/queries/price/fetch-token-by-denom";
import {
  legacyFetchAllValidators,
  legacyFetchStakingInfo,
} from "./procedures/legacy/queries/legacy-total-staked-by-address";
import { fetchAccountEvmosRewards } from "./procedures/account/fetch-account-evmos-rewards";
import { fetchAccountStakedEvmos } from "./procedures/account/fetch-account-staked-evmos";

export const appRouter = router({
  token: router({
    all: publicProcedure.query(fetchTokens),
    byDenom: publicProcedure
      .input(z.string())
      .query((opts) => fetchTokenByDenom(opts.input)),

    price: router({
      all: publicProcedure.query(fetchTokenPrices),
      byDenom: publicProcedure
        .input(z.string())
        .query((opts) => fetchTokenPriceByDenom(opts.input)),
    }),
  }),

  chain: router({
    all: publicProcedure.query(fetchChains),
    byRef: publicProcedure
      .input(z.string())
      .query((opts) => fetchChainByRef(opts.input)),
  }),

  account: router({
    balance: router({
      all: publicProcedure
        .input(
          z.object({
            chainRef: z.string(),
            address: AddressSchema,
          }),
        )
        .query((opts) => fetchAccountBalances(opts.input)),
      byDenom: publicProcedure
        .input(
          z.object({
            chainRef: z.string(),
            address: AddressSchema,
            denom: z.string(),
          }),
        )
        .query((opts) => fetchAccountBalanceByDenom(opts.input)),
      rewards: router({
        evmos: publicProcedure
          .input(
            z.object({
              chainRef: z.string(),
              address: AddressSchema,
            }),
          )
          .query((opts) => fetchAccountEvmosRewards(opts.input)),
      }),
      staked: router({
        evmos: publicProcedure
          .input(
            z.object({
              chainRef: z.string(),
              address: AddressSchema,
            }),
          )
          .query((opts) => fetchAccountStakedEvmos(opts.input)),
      }),
    }),
  }),

  metrics: router({
    cosmosRest: publicProcedure
      .input(z.string())
      .query((opts) => fetchChainCosmosRestMetrics(opts.input)),
    evmosJSONRpc: publicProcedure
      .input(z.string())
      .query((opts) => fetchEVMJsonRpcMetrics(opts.input)),
    preferredEVMJsonRpcUrl: publicProcedure
      .input(z.string())
      .query((opts) => fetchPreferredEvmJsonRpcUrl(opts.input)),

    preferredCosmosRestUrl: publicProcedure
      .input(z.string())
      .query((opts) => fetchPreferredCosmosRestUrl(opts.input)),
  }),

  legacy: router({
    erc20ModuleBalance: publicProcedure
      .input(
        z.object({
          chainRef: z.string(),
          address: AddressSchema.optional(),
        }),
      )
      .query((opts) => legacyFetchERC20ModuleBalance(opts.input)),

    stakingInfo: publicProcedure
      .input(
        z.object({
          chainRef: z.string(),
          address: AddressSchema,
        }),
      )
      .query((opts) => legacyFetchStakingInfo(opts.input)),
    allValidators: publicProcedure
      .input(
        z.object({
          chainRef: z.string(),
        }),
      )
      .query((opts) => legacyFetchAllValidators(opts.input)),
  }),
});

export type AppRouter = typeof appRouter;
