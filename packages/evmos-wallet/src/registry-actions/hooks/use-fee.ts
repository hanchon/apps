import { useMemo } from "react";
import { Address, CosmosAddress, HexAddress } from "../../wallet";
import { getChainByAddress } from "../get-chain-by-account";
import { getTokenByDenom } from "../get-token-by-denom";
import { simulateTransfer } from "../transfers/prepare-transfer";
import { Prefix, TokenMinDenom } from "../types";
import { useQuery } from "@tanstack/react-query";
import { E, multiply } from "helpers";
import { bech32 } from "bech32";
import { useAccountExists } from "./use-account-exists";

/**
 * this is used to simulate a transfer before the user has entered the receiver address
 * so we can show the estimated gas fee early on. THIS IS ONLY FOR THE SIMULATION
 */
const fakeWalletAddress = "0x0000000000000000000000000000000000000001";

const ethToBech32 = <T extends Prefix>(address: HexAddress, prefix: T) => {
  const words = bech32.toWords(Buffer.from(address.slice(2), "hex"));
  return bech32.encode(prefix, words) as CosmosAddress<T>;
};

export const useFee = ({
  sender,
  receiverChainPrefix,
  denom,
}: {
  sender?: Address<Prefix>;
  receiverChainPrefix?: Prefix;
  denom?: TokenMinDenom;
}) => {
  const { data: accountExists } = useAccountExists(sender);
  const { data, ...rest } = useQuery({
    staleTime: 1000 * 30,
    queryKey: ["use-fee", sender, receiverChainPrefix, denom],
    queryFn: async () => {
      if (!sender || !receiverChainPrefix || !denom) {
        return null;
      }

      const [err, prepared] = await E.try(() =>
        simulateTransfer({
          sender,
          receiver: ethToBech32(fakeWalletAddress, receiverChainPrefix),
          token: {
            denom,
            amount: 1n,
          },
        })
      );
      if (err) {
        if (E.match.byPattern(err, /NotFound/g)) {
          throw new Error("ACCOUNT_NOT_FOUND");
        }
        throw new Error("UNKNOWN_ERROR", { cause: err });
      }

      const { estimatedGas } = prepared;
      const senderChain = getChainByAddress(sender);
      const feeToken = getTokenByDenom(senderChain.nativeCurrency);

      return {
        gas: estimatedGas,
        token: {
          amount: multiply(estimatedGas, senderChain.gasPriceStep.average),
          denom: feeToken.minCoinDenom,
        },
      };
    },
    enabled: !!sender && !!receiverChainPrefix && !!denom && accountExists,
  });
  return {
    ...rest,
    fee: data,
  };
};
