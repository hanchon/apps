import { Address, isEvmosAddress } from "../../wallet";
import { Prefix, TokenAmount } from "../types";
import {
  prepareContractERC20Transfer,
  writeContractERC20Transfer,
} from "./prepare-contract-erc20-transfer";
import {
  prepareContractIBCTransfer,
  writeContractIBCTransfer,
} from "./prepare-contract-ibc-transfer";
import {
  executeCosmosIBCTransfer,
  prepareCosmosIBCTransfer,
} from "./prepare-cosmos-ibc-transfer";
import { prepareEvmTransfer, writeEvmTransfer } from "./prepare-evm-transfer";

export const simulateTransfer = async ({
  sender,
  receiver,
  token,
}: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
  token: TokenAmount;
}) => {
  const senderIsEvmos = isEvmosAddress(sender);
  const receiverIsEvmos = isEvmosAddress(receiver);

  /**
   * Evmos -> Evmos
   */

  if (senderIsEvmos && receiverIsEvmos) {
    if (token.ref === "evmos:EVMOS") {
      return {
        method: "evm-transfer",
        sender,
        receiver,
        token,
        ...(await prepareEvmTransfer({
          receiver,
          amount: token,
        })),
      } as const;
    }
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

export const transfer = async ({
  sender,
  receiver,
  token,
  fee,
}: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
  token: TokenAmount;
  fee?: {
    gasLimit: bigint;
    token: TokenAmount;
  };
}) => {
  const senderIsEvmos = isEvmosAddress(sender);
  const receiverIsEvmos = isEvmosAddress(receiver);

  if (senderIsEvmos && receiverIsEvmos) {
    if (token.ref === "evmos:EVMOS") {
      return await writeEvmTransfer({
        receiver,
        amount: token,
      });
    }
    return await writeContractERC20Transfer({
      sender,
      receiver,
      token,
    });
  }
  if (senderIsEvmos && !receiverIsEvmos) {
    return await writeContractIBCTransfer({
      sender,
      receiver,
      token,
    });
  }
  if (!senderIsEvmos && receiverIsEvmos) {
    return await executeCosmosIBCTransfer({
      sender,
      receiver,
      token,
      fee,
    });
  }

  throw new Error("UNSUPPORTED_TRANSFER_METHOD");
};
