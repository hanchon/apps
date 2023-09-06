import { SignMode } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/signing/v1beta1/signing_pb";
import { MsgTransfer } from "@buf/cosmos_ibc.bufbuild_es/ibc/applications/transfer/v1/tx_pb";
import { apiCosmosTxSimulate } from "../../api/cosmos-rest/api-cosmos-tx-simulate";
import {
  getChannelId,
  createProtobufTransaction,
  buffGasEstimate,
} from "../../ibc";
import { Address, normalizeToCosmosAddress } from "../../wallet";
import { getChainByAddress } from "../get-chain-by-account";
import { Prefix, TokenMinDenom } from "../types";
import { getTimeoutTimestamp } from "../utils";
import { assignGasEstimateToProtoTx } from "../utils/assign-gas-estimate-to-proto-tx";

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

export const prepareCosmosIBCTransfer = async (params: {
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

  return {
    estimatedGas,
    tx: assignGasEstimateToProtoTx(params.sender, tx, estimatedGas),
  };
};
