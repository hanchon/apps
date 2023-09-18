import { ics20Abi } from "@evmos-apps/registry";
import { assertIf } from "helpers";

import {
  Address,
  evmosClient,
  isEvmosAddress,
  normalizeToEth,
} from "../../wallet";
import { Prefix, Token, TokenMinDenom } from "../types";
import { getIBCChannelId, getTimeoutTimestamp } from "../utils";
import { writeContract } from "wagmi/actions";
import { getIBCDenom } from "../utils/get-ibc-denom";
import { buffGasEstimate } from "../utils/buff-gas-estimate";

export const prepareContractIBCTransfer = async <T extends Prefix>({
  token,
  sender,
  receiver,
  amount,
}: {
  sender: Address<T>;
  receiver: Address<Exclude<Prefix, T>>; // Can't IBC transfer to the same network
  token: Token;
  amount: bigint;
}) => {
  assertIf(
    isEvmosAddress(sender),
    "Sender must be an EVMOS address to transfer through ICS20 contract"
  );

  const senderAddressAsHex = normalizeToEth(sender);
  const args = {
    abi: ics20Abi,
    address: "0x0000000000000000000000000000000000000802",
    account: senderAddressAsHex,
    functionName: "transfer",
    args: [
      "transfer",
      getIBCChannelId({
        sender,
        receiver,
      }),
      getIBCDenom({
        sender,
        receiver,
        token,
      }),
      amount,
      senderAddressAsHex,
      receiver,
      {
        revisionNumber: 0n,
        revisionHeight: 0n,
      },
      getTimeoutTimestamp(),
      "",
    ],
  } as const;

  const { request } = await evmosClient.simulateContract(args);

  return {
    tx: request,
    estimatedGas: buffGasEstimate(await evmosClient.estimateContractGas(args)),
  };
};

export const writeContractIBCTransfer = async <T extends Prefix>({
  token,
  sender,
  receiver,
  amount,
}: {
  sender: Address<T>;
  receiver: Address<Exclude<Prefix, T>>; // Can't IBC transfer to the same network
  token: Token;
  amount: bigint;
}) => {
  const prepared = await prepareContractIBCTransfer({
    sender,
    receiver,
    token,
    amount,
  });

  return writeContract(prepared.tx);
};
