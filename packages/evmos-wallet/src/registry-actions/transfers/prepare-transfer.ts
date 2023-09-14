import { writeContract } from "wagmi/actions";
import { Address, isEvmosAddress } from "../../wallet";
import { Prefix, TokenMinDenom } from "../types";
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
import { E, raise } from "helpers";
import { getToken } from "../get-token";

export const simulateTransfer = async ({
  sender,
  receiver,
  token,
}: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
  token: {
    sourcePrefix: Prefix;
    denom: TokenMinDenom;
    amount: bigint;
  };
}) => {
  const senderIsEvmos = isEvmosAddress(sender);
  const receiverIsEvmos = isEvmosAddress(receiver);
  const tokenConfig =
    getToken(token.sourcePrefix, token.denom) ?? raise("TOKEN_NOT_FOUND");
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
        token: tokenConfig,
        amount: token.amount,
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
        token: tokenConfig,
        amount: token.amount,
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
        token: tokenConfig,
        amount: token.amount,
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
  const senderIsEvmos = isEvmosAddress(sender);
  const receiverIsEvmos = isEvmosAddress(receiver);
  const tokenConfig =
    getToken(token.sourcePrefix, token.denom) ?? raise("TOKEN_NOT_FOUND");

  if (senderIsEvmos && receiverIsEvmos) {
    return await writeContractERC20Transfer({
      sender,
      receiver,
      token: tokenConfig,
      amount: token.amount,
    });
  }
  if (senderIsEvmos && !receiverIsEvmos) {
    return await writeContractIBCTransfer({
      sender,
      receiver,
      token: tokenConfig,
      amount: token.amount,
    });
  }
  if (!senderIsEvmos && receiverIsEvmos) {
    return await executeCosmosIBCTransfer({
      sender,
      receiver,
      token: tokenConfig,
      amount: token.amount,
      fee,
    });
  }

  throw new Error("UNSUPPORTED_TRANSFER_METHOD");
};
