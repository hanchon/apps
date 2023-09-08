import { writeContract } from "wagmi/actions";
import { Address, isEvmosAddress } from "../../wallet";
import { Prefix, TokenMinDenom } from "../types";
import { prepareContractERC20Transfer } from "./prepare-contract-erc20-transfer";
import { prepareContractIBCTransfer } from "./prepare-contract-ibc-transfer";
import { prepareCosmosIBCTransfer } from "./prepare-cosmos-ibc-transfer";
import { E } from "helpers";

export const prepareTransfer = async ({
  sender,
  receiver,
  token,
}: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
  token: {
    denom: TokenMinDenom;
    amount: bigint;
  };
}) => {
  const senderIsEvmos = isEvmosAddress(sender);
  const receiverIsEvmos = isEvmosAddress(receiver);

  /**
   * Evmos -> Evmos
   */
  if (senderIsEvmos && receiverIsEvmos) {
    return {
      method: "erc20-extension-transfer",
      sender,
      receiver,
      token,
      ...(await prepareContractERC20Transfer({
        sender,
        receiver,
        token,
      })),
    } as const;
  }
  /**
   * Evmos -> Cosmos
   */
  if (senderIsEvmos && !receiverIsEvmos) {
    return {
      method: "ics20-extension-transfer",
      sender,
      receiver,
      token,
      ...(await prepareContractIBCTransfer({
        sender,
        receiver,
        token,
      })),
    } as const;
  }
  /**
   * Cosmos -> Evmos
   */
  if (!senderIsEvmos && receiverIsEvmos) {
    return {
      method: "ibc-transfer",
      sender,
      receiver,
      token,
      ...(await prepareCosmosIBCTransfer({
        sender,
        receiver,
        token,
      })),
    } as const;
  }
  /**
   * Cosmos -> Cosmos
   * Unsupported
   */
  throw new Error("UNSUPPORTED_TRANSFER_METHOD");
};

// type Transfer = Awaited<ReturnType<typeof prepareTransfer>>[""];
export const transfer = async ({
  method,
  tx,
  ...params
}: Awaited<ReturnType<typeof prepareTransfer>>) => {
  switch (method) {
    case "erc20-extension-transfer":
    case "ics20-extension-transfer":
      tx;
      return await writeContract(
        tx as Extract<typeof tx, { type: "contract" }>
      );
    case "ibc-transfer":
    // return await transferCosmosIBC(params);
    default:
      throw new Error("UNSUPPORTED_TRANSFER_METHOD");
  }
};
