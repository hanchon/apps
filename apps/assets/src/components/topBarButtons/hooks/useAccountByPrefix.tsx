import { Prefix } from "evmos-wallet/src/registry-actions/types";
import { useAccount } from "wagmi";
import {
  CosmosAddress,
  getActiveProviderKey,
  getKeplrProvider,
  normalizeToCosmosAddress,
} from "evmos-wallet";
import { chains } from "@evmos-apps/registry";
import { useQuery } from "@tanstack/react-query";
import { E } from "helpers";

export const useAccountByPrefix = (prefix?: Prefix) => {
  const { address, connector } = useAccount();
  const chain = prefix ? chains[prefix] : undefined;
  return useQuery({
    queryKey: ["network", prefix, connector?.id],
    retry: false,
    staleTime: 0,
    queryFn: async () => {
      if (!chain) {
        throw new Error("NETWORK_NOT_SUPPORTED_BY_WALLET");
      }
      const activeProvider = await getActiveProviderKey();
      if (!activeProvider) return;
      if (activeProvider === "keplr") {
        const keplr = await getKeplrProvider();

        const [err, account] = await E.try(() => keplr.getKey(chain.cosmosId));

        if (err) {
          throw new Error("USER_REJECTED_REQUEST", { cause: err });
        }

        const { bech32Address, isNanoLedger, pubKey } = account;
        return {
          prefix: chain.prefix,
          bech32Address: bech32Address as CosmosAddress<Prefix>,
          isNanoLedger,
          pubKey,
        };
      }
      if (prefix !== "evmos")
        throw new Error("NETWORK_NOT_SUPPORTED_BY_WALLET");
      if (!address) throw new Error("NOT_CONNECTED");
      return {
        prefix: chain.prefix,
        bech32Address: normalizeToCosmosAddress(address),
        evmAddress: address,
      };
    },

    enabled: !!address && !!prefix,
  });
};
