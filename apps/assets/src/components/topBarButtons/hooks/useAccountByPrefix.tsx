import { Chain, Prefix } from "evmos-wallet/src/registry-actions/types";
import { useAccount } from "wagmi";
import {
  CosmosAddress,
  getActiveProviderKey,
  getKeplrProvider,
  normalizeToCosmosAddress,
} from "evmos-wallet";
import { chains } from "@evmos-apps/registry";
import { useMutation, useQuery } from "@tanstack/react-query";
import { E } from "helpers";
import { useId } from "react";

const suggestChain = async (prefix: Prefix) => {
  const keplr = await getKeplrProvider();
  if (prefix === "cre") {
    const chainInfo = await import(
      "chainapsis-suggest-chain/cosmos/crescent.json"
    );
    await keplr.experimentalSuggestChain(chainInfo);
  }
  if (prefix === "emoney") {
    const chainInfo = await import(
      "chainapsis-suggest-chain/cosmos/emoney.json"
    );
    await keplr.experimentalSuggestChain(chainInfo);
  }
  if (prefix === "tori") {
    const chainInfo = await import(
      "chainapsis-suggest-chain/cosmos/teritori.json"
    );
    await keplr.experimentalSuggestChain(chainInfo);
  }
  if (prefix === "comdex") {
    const chainInfo = await import(
      "chainapsis-suggest-chain/cosmos/comdex.json"
    );
    await keplr.experimentalSuggestChain(chainInfo);
  }
  // If not in this list, it's supported by keplr by default
};

export const useWalletAccountByPrefix = (prefix?: Prefix) => {
  const { address, connector } = useAccount();
  const chain = prefix ? chains[prefix] : undefined;
  return useQuery({
    queryKey: ["wallet_account_request", prefix, connector?.id],
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
        const [suggestChainErr] = await E.try(() => suggestChain(chain.prefix));
        if (suggestChainErr) {
          throw new Error("USER_REJECTED_REQUEST", { cause: suggestChainErr });
        }

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

// export const useWalletAddressess = () => {
//   const id = useId();
//   return useMutation({
//     mutationKey: ["wallet_address_request", id],
//     mutationFn: async () => {
//       const activeProvider = await getActiveProviderKey();
//       if (!activeProvider) return;
//       const keplr = await getKeplrProvider();
//       const allChains = Object.values(chains);

//       const [needSuggesting, keplrSupported] = allChains.reduce(
//         (acc: [Chain[], Chain[]], chain) => {
//           const [needSuggesting, keplrSupported] = acc;
//           if (["cre", "emoney", "tori", "comdex"].includes(chain.prefix)) {
//             needSuggesting.push(chain);
//             return acc;
//           }
//           keplrSupported.push(chain);
//           return acc;
//         },
//         [[], []]
//       );
//       const [suggestChainErr] = await E.try(() => {
//         return Promise.all([
//           ...needSuggesting.map((chain) => suggestChain(chain.prefix)),
//           keplr.enable(keplrSupported.map((chain) => chain.cosmosId)),
//         ]);
//       });
//       // const accounts = await keplr.getKeysSettled([]);
//     },
//   });
// };
