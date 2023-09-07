import { Tx } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/v1beta1/tx_pb";

import { Message, PartialMessage } from "@bufbuild/protobuf";
import { PubKey as EthSecp256k1PubKey } from "@buf/evmos_evmos.bufbuild_es/ethermint/crypto/v1/ethsecp256k1/keys_pb";
import { SignMode } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/signing/v1beta1/signing_pb";
import { PubKey as Secp256k1PubKey } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/crypto/secp256k1/keys_pb";
import { Any } from "@bufbuild/protobuf";
import { MsgSend } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/bank/v1beta1/tx_pb";
import {
  Address,
  evmosClient,
  getKeplrAccounts,
  isEvmosAddress,
  normalizeToCosmosAddress,
  normalizeToEth,
  normalizeToEvmos,
} from "../wallet";
import {
  Chain,
  Prefix,
  TokenDenom,
  TokenMinDenom,
} from "../registry-actions/types";
import { isValidCosmosAddress } from "../wallet/utils/addresses/is-valid-cosmos-address";
import { chains } from "@evmos-apps/registry";
import { apiCosmosAccountByAddress } from "../api/cosmos-rest";
import { getTokenByDenom, getTokenByMinDenom } from "../registry-actions";
import { MsgTransfer } from "@buf/cosmos_ibc.bufbuild_es/ibc/applications/transfer/v1/tx_pb";
import { getChainByAddress } from "../registry-actions/get-chain-by-account";
import { apiCosmosTxSimulate } from "../api/cosmos-rest/api-cosmos-tx-simulate";
import { apiTendermintStatus } from "../api/tendermint";
import {
  PrepareWriteContractConfig,
  prepareWriteContract,
} from "wagmi/actions";
import { assertIf, multiply } from "helpers";
import { erc20ABI } from "wagmi";
import { ics20Abi } from "@evmos-apps/registry";

const getPubkey = async (args: {
  chainId?: Chain["cosmosId"];
  address?: Address<Prefix>;
}) => {
  const [{ pubkey, address }] = await getKeplrAccounts(
    args.chainId ?? chains.evmos.cosmosId
  );
  if (args.address && args.address !== address) {
    throw new Error(
      `Keplr address ${args.address} does not match ${address} from chain ${args.chainId}`
    );
  }
  return pubkey;
};

const getChainAccountInfo = async (address: Address<Prefix>) => {
  const cosmosAddress = isValidCosmosAddress(address)
    ? address
    : normalizeToEvmos(address);

  const chain = getChainByAddress(address);

  const { account } = await apiCosmosAccountByAddress(
    chain.cosmosRest.http,
    cosmosAddress
  );

  if (account["@type"] === "/ethermint.types.v1.EthAccount") {
    return {
      address: cosmosAddress,
      sequence: account.base_account.sequence,
      publicKey: new EthSecp256k1PubKey({
        key:
          account.base_account.pub_key?.key ??
          (await getPubkey({
            chainId: chain.cosmosId,
            address: cosmosAddress,
          })),
      }),
      accountNumber: account.base_account.account_number,
    };
  }

  if (account["@type"] === "/cosmos.auth.v1beta1.BaseAccount") {
    return {
      address: cosmosAddress,
      sequence: account.sequence,
      publicKey: new Secp256k1PubKey({
        key:
          account.pub_key?.key ??
          (await getPubkey({
            chainId: chain.cosmosId,
            address: cosmosAddress,
          })),
      }),
      accountNumber: account.account_number,
    };
  }

  throw new Error(`Unsupported account type: ${account["@type"]}`);
};

export type IBCMsgTransferParams = {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
  token: {
    denom: TokenMinDenom;
    amount: bigint;
  };
  mode?: keyof typeof SignMode;
} & Omit<PartialMessage<MsgTransfer>, "sender" | "receiver" | "token">;

const ONE_DAY_IN_MILLISECONDS = 60 * 60 * 24 * 1000;
export const getTimeoutTimestamp = () =>
  BigInt(Date.now() + ONE_DAY_IN_MILLISECONDS) * 1000000n;
export const getChannelId = ({
  sender,
  receiver,
}: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
}) => {
  const senderChain = getChainByAddress(sender);
  const receiverChain = getChainByAddress(receiver);
  if (senderChain.prefix !== "evmos") {
    return senderChain.source.sourceChannel;
  }
  if (receiverChain.prefix !== "evmos") {
    return receiverChain.source.destinationChannel;
  }
  throw new Error(
    `Could not find channel id for ${senderChain.name} -> ${receiverChain.name}`
  );
};
// export const getIBCTransferBaseArgs = ({
//   sender,
//   receiver,
// }: Pick<IBCMsgTransferParams, "sender" | "receiver">) => {
//   const senderChain = getChainByAddress(sender);
//   const receiverChain = getChainByAddress(receiver);

//   assertIf(
//     senderChain.prefix !== receiverChain.prefix,
//     [
//       `You're trying to IBC transfer between two accounts from the same network, ${senderChain.name} -> ${receiverChain.name}.`,
//       "Transfers between accounts on the same network should be done through MsgSend.",
//     ].join("\n")
//   );

//   /**
//    * Right now this assumes that one of the chains is evmos.
//    * Mostly because our registry only has channel numbers for evmos -> other chains and vice versa
//    *
//    * We may want to make it more flexible if we access a list of channels for different network pairs
//    *
//    * like this: https://github.com/cosmos/chain-registry/tree/master/_IBC
//    */

//   return {
//     sender: normalizeToCosmosAddress(sender),
//     receiver: normalizeToCosmosAddress(receiver),
//     sourceChannel: getChannelId({
//       sender,
//       receiver,
//     }),
//     sourcePort: "transfer",
//     timeoutTimestamp: getTomorrow(),
//   };
// };

export const createProtobufMsgSend = async ({
  sender,
  receiver,
  token,
  mode,
}: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
  token: {
    denom: TokenMinDenom;
    amount: bigint;
  };
  mode?: keyof typeof SignMode;
}) => {
  const message = new MsgSend({
    fromAddress: normalizeToCosmosAddress(sender),
    toAddress: normalizeToCosmosAddress(receiver),
    amount: [
      {
        amount: token.amount.toString(),
        denom: token.denom,
      },
    ],
  });
  return createProtobufTransaction({
    sender: sender,
    messages: [message],
    mode: mode,
  });
};

export const createProtobufIBCTransferMsg = async ({
  sender,
  receiver,
  token,
  mode,
  ...rest
}: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
  token: {
    denom: TokenMinDenom;
    amount: bigint;
  };
  mode?: keyof typeof SignMode;
}) => {
  const message = new MsgTransfer({
    sender: normalizeToCosmosAddress(sender),
    receiver: normalizeToCosmosAddress(receiver),
    sourceChannel: getChannelId({
      sender,
      receiver,
    }),
    sourcePort: "transfer",
    timeoutTimestamp: getTimeoutTimestamp(),
    memo: "",
    token: {
      amount: token.amount.toString(),
      denom: token.denom,
    },
    ...rest,
  });

  return createProtobufTransaction({
    sender,
    messages: [message],
    mode,
  });
};

export const createProtobufTransaction = async ({
  sender,
  messages,
  memo = "",
  mode = "DIRECT",
}: {
  sender: Address<Prefix>;
  messages: Message[];
  memo?: string;
  mode?: keyof typeof SignMode;
}) => {
  const chain = getChainByAddress(sender);
  const { publicKey, sequence } = await getChainAccountInfo(sender);
  const nativeToken = getTokenByDenom(chain.nativeCurrency);

  return new Tx({
    body: {
      memo: memo,
      messages: messages.map(
        (msg) =>
          new Any({
            typeUrl: `/${msg.getType().typeName}`,
            value: msg.toBinary(),
          })
      ),
    },
    authInfo: {
      signerInfos: [
        {
          publicKey: new Any({
            typeUrl: `/${publicKey.getType().typeName}`,
            value: publicKey.toBinary(),
          }),
          modeInfo: {
            sum: {
              case: "single",
              value: {
                mode: SignMode[mode],
              },
            },
          },
          sequence,
        },
      ],
      fee: {
        amount: [
          {
            amount: "0",
            denom: nativeToken.minCoinDenom,
          },
        ],
        gasLimit: 0n,
      },
    },
    signatures: [new Uint8Array()],
  });
};

export const buffGasEstimate = (gas: bigint) => multiply(gas, 1.5);
export const simulateTransaction = async ({
  sender,
  tx,
}: {
  sender: Address<Prefix>;
  tx: Tx;
}) => {
  const chain = getChainByAddress(sender);
  const response = await apiCosmosTxSimulate(chain.cosmosRest.http, tx);
  return response.gas_info.gas_used;
};

export const prepareIBCMsgTransfer = async (params: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
  token: {
    denom: TokenMinDenom;
    amount: bigint;
  };
}) => {
  const tx = await createProtobufIBCTransferMsg(params);
  const chain = getChainByAddress(params.sender);
  const gas = (await apiCosmosTxSimulate(chain.cosmosRest.http, tx)).gas_info
    .gas_used;

  const estimatedGas = buffGasEstimate(gas);
  if (tx.authInfo?.fee) {
    tx.authInfo.fee.gasLimit = estimatedGas;
    const chain = getChainByAddress(params.sender);
    const average = chain.gasPriceStep.average;
    tx.authInfo.fee.amount[0].amount = multiply(
      estimatedGas,
      average
    ).toString();
  }
  return {
    estimatedGas,
    tx,
  };
};

export const prepareContractIBCTransfer = async <T extends Prefix>({
  token,
  sender,
  receiver,
}: {
  sender: Address<T>;
  receiver: Address<Exclude<Prefix, T>>; // Can't IBC transfer to the same network
  token: {
    denom: TokenMinDenom;
    amount: bigint;
  };
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
      getChannelId({
        sender,
        receiver,
      }),
      token.denom,
      token.amount,
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

export const prepareContractERC20Transfer = async ({
  sender,
  receiver,
  token,
}: {
  sender: Address<"evmos">;
  receiver: Address<"evmos">;
  token: {
    denom: TokenMinDenom;
    amount: bigint;
  };
}) => {
  const tokenConfig = getTokenByMinDenom(token.denom);
  const args = {
    abi: erc20ABI,
    functionName: "transfer",
    address: tokenConfig.erc20Address,
    args: [normalizeToEth(receiver), token.amount],
    account: normalizeToEth(sender),
  } as const;
  const { request } = await evmosClient.simulateContract(args);
  return {
    tx: request,
    estimatedGas: buffGasEstimate(await evmosClient.estimateContractGas(args)),
  };
};
