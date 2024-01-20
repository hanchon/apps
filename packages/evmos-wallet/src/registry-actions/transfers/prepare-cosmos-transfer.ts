// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { MsgSend } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/bank/v1beta1/tx_pb";
import { SignMode } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/signing/v1beta1/signing_pb";

import { TokenAmount } from "../types";
import { apiCosmosTxSimulate } from "../../api/cosmos-rest/api-cosmos-tx-simulate";
import { getChainByAddress } from "../get-chain-by-account";
import { assignGasEstimateToProtoTx } from "../utils/assign-gas-estimate-to-proto-tx";
import { buffGasEstimate } from "../utils/buff-gas-estimate";
import { createProtobufTransaction } from "../utils/create-protobuf-transaction";
import { getTokenByRef } from "../get-token-by-ref";
import { Address } from "helpers/src/crypto/addresses/types";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";

export const createProtobufMsgSend = async ({
  sender,
  receiver,
  token,
  mode,
}: {
  sender: Address;
  receiver: Address;
  token: TokenAmount;
  mode?: keyof typeof SignMode;
}) => {
  const transferredToken = getTokenByRef(token.ref);
  const message = new MsgSend({
    fromAddress: normalizeToCosmos(sender),
    toAddress: normalizeToCosmos(receiver),
    amount: [
      {
        amount: token.amount.toString(),
        denom: transferredToken.sourceDenom,
      },
    ],
  });
  return createProtobufTransaction({
    sender: sender,
    messages: [message],
    mode: mode,
  });
};

export const prepareCosmosTransfer = async (params: {
  sender: Address;
  receiver: Address;
  token: TokenAmount;
}) => {
  const tx = await createProtobufMsgSend(params);
  const chain = getChainByAddress(params.sender);
  const gas = (await apiCosmosTxSimulate(chain.cosmosRest, tx)).gas_info
    .gas_used;
  const estimatedGas = buffGasEstimate(gas);

  return {
    estimatedGas,
    tx: assignGasEstimateToProtoTx(params.sender, tx, estimatedGas),
  };
};
