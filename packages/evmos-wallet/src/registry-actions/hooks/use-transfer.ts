import { Address } from "../../wallet";
import { prepareTransfer } from "../transfers/prepare-transfer";
import { Prefix, TokenMinDenom } from "../types";
import { useQuery } from "@tanstack/react-query";
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
    queryFn: () => {
      if (!sender || !receiver || !token) {
        return null;
      }
      return prepareTransfer({
        sender,
        receiver,
        token,
      });
    },
    enabled: !!sender && !!receiver && !!token,
  });
};
