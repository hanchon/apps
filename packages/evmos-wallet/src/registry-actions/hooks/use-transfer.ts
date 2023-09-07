import { useMemo } from "react";
import { Address } from "../../wallet";
import { getChainByAddress } from "../get-chain-by-account";
import { getTokenByDenom } from "../get-token-by-denom";
import { prepareTransfer } from "../transfers/prepare-transfer";
import { Prefix, TokenMinDenom } from "../types";
import { useQuery } from "@tanstack/react-query";
import { multiply } from "helpers";
export const usePrepareTransfer = ({
  sender,
  receiver,
  token,
}: {
  sender?: Address<Prefix>;
  receiver?: Address<Prefix>;
  token?: {
    denom: TokenMinDenom;
    amount: bigint;
  };
}) => {
  return useQuery({
    queryKey: [
      "transfer",
      sender,
      receiver,
      token?.denom,
      token?.amount.toString(),
    ],
    queryFn: async () => {
      if (!sender || !receiver || !token) {
        return null;
      }
      const prepared = await prepareTransfer({
        sender,
        receiver,
        token,
      });

      const senderChain = getChainByAddress(sender);
      const feeToken = getTokenByDenom(senderChain.nativeCurrency);

      return {
        ...prepared,
        fee: {
          amount: multiply(
            prepared.estimatedGas,
            senderChain.gasPriceStep.average
          ),
          denom: feeToken.minCoinDenom,
        },
      };
    },
    enabled: !!sender && !!receiver && !!token,
  });
};
