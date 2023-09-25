import { switchNetwork } from "wagmi/actions";
import { Address } from "../../wallet";
import { transfer } from "../transfers/prepare-transfer";
import { Prefix, TokenAmount } from "../types";
import { useMutation } from "@tanstack/react-query";
import { getEvmosChainInfo } from "../../wallet/wagmi/chains";

const evmos = getEvmosChainInfo();
export const useTransfer = ({
  sender,
  receiver,
  token,
  fee,
}: {
  sender?: Address<Prefix>;
  receiver?: Address<Prefix>;
  token?: TokenAmount;
  fee?: {
    gasLimit: bigint;
    token: TokenAmount;
  };
}) => {
  const isReady = sender && receiver && token && fee && token.amount > 0n;
  const { mutate, ...rest } = useMutation({
    mutationFn: async () => {
      if (!isReady) {
        throw new Error("NOT_READY_TO_TRANSFER");
      }
      await switchNetwork({
        chainId: evmos.id,
      });
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
