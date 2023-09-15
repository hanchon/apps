import { useMemo } from "react";
import {
  Address,
  CosmosAddress,
  HexAddress,
  getPrefix,
  isValidCosmosAddress,
} from "../../wallet";
import { getChainByAddress } from "../get-chain-by-account";
import { getTokenByDenom } from "../get-token-by-denom";
import { simulateTransfer, transfer } from "../transfers/prepare-transfer";
import { Prefix, TokenMinDenom } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { E, multiply } from "helpers";
import { bech32 } from "bech32";
import { useAccountExists } from "./use-account-exists";
import { useFee } from "./use-fee";

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
