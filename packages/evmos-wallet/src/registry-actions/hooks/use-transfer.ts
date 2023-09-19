import { Address } from "../../wallet";
import { transfer } from "../transfers/prepare-transfer";
import { Prefix, TokenMinDenom } from "../types";
import { useMutation } from "@tanstack/react-query";

export const useTransfer = ({
  sender,
  receiver,
  token,
  fee,
}: {
  sender?: Address<Prefix>;
  receiver?: Address<Prefix>;

  token: {
    sourcePrefix: Prefix;
    denom: TokenMinDenom;
    amount: bigint;
  };
  fee?: {
    gasLimit: bigint;
    token: {
      denom: TokenMinDenom;
      amount: bigint;
    };
  };
}) => {
  const isReady = sender && receiver && token && fee && token.amount > 0n;
  const { mutate, ...rest } = useMutation({
    mutationFn: () => {
      if (!isReady) {
        throw new Error("NOT_READY_TO_TRANSFER");
      }
      return transfer({
        sender,
        receiver,
        token,
        fee,
      });
    },
  });

  return {
    transfer: mutate,
    isReady,
    ...rest,
  };
};
