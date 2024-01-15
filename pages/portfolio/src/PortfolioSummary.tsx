"use client";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  AccountBalanceQueryOptions,
  CosmosAccountBalanceQueryOptions,
  ERC20AccountBalanceQueryOptions,
} from "@evmosapps/evmos-wallet/src/queries/account-balance-query";
import { useAccount } from "wagmi";
import { CosmosQueryOptions } from "@evmosapps/evmos-wallet/src/queries/cosmos-rest-query";
import { fetchTokenByIbcDenom } from "@evmosapps/evmos-wallet/src/server/fetch-token-by-ibc-hash.server";
import { wagmiConfig } from "@evmosapps/evmos-wallet";
import { getChainId } from "wagmi/actions";
import { raise } from "helpers";
import { AllTokenPricesQueryOptions } from "@evmosapps/evmos-wallet/src/queries/all-token-prices-query";
const getEvmos = () => {
  return (
    wagmiConfig.chains.find((chain) => chain.id === getChainId(wagmiConfig)) ??
    raise("Evmos chain not found")
  );
};

const getEvmosIdentifier = () => getEvmos().identifier;
export const PortfolioSummary = () => {
  const { address } = useAccount();

  const results = useQueries({
    queries: [
      AccountBalanceQueryOptions(getEvmosIdentifier(), address),
      AllTokenPricesQueryOptions(),
    ],
    combine: ([{ data: balances }, { data: prices }]) => {
      return {
        balances,
        prices,
      };
    },
  });

  //    ^?

  return (
    <div className="grid bg-darkGray2 text-pearl rounded-2xl p-4 text-center gap-y-6 md:grid-cols-3">
      <div>
        <h3 className="text-xs font-normal opacity-80">Total Assets</h3>
        <p className="font-body text-xl font-bold flex justify-center">$7.74</p>
      </div>
      <div>
        <h3 className="text-xs font-normal opacity-80">EvmosPrice</h3>
        <p className="font-body text-xl font-bold flex justify-center">$7.74</p>
      </div>
      <div>
        <h3 className="text-xs font-normal opacity-80">EvmosPrice</h3>
        <p className="font-body text-xl font-bold flex justify-center">$7.74</p>
      </div>
    </div>
  );
};
