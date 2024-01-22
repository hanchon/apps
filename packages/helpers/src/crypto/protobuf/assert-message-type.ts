// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  AnyMessage,
  Message,
  MessageType,
  PlainMessage,
} from "@bufbuild/protobuf";
import { get } from "lodash-es";

type Types = [
  typeof import("@buf/evmos_evmos.bufbuild_es/ethermint/types/v1/account_pb").EthAccount,
  typeof import("@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/auth/v1beta1/auth_pb").BaseAccount,

  typeof import("@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/crypto/secp256k1/keys_pb").PubKey,
  typeof import("@buf/evmos_evmos.bufbuild_es/ethermint/crypto/v1/ethsecp256k1/keys_pb").PubKey,

  typeof import("@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/gov/v1beta1/gov_pb").Deposit,

  typeof import("@buf/evmos_evmos.bufbuild_es/evmos/inflation/v1/tx_pb").MsgUpdateParams,
  typeof import("@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/distribution/v1beta1/tx_pb").MsgCommunityPoolSpend,
  typeof import("@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/gov/v1/tx_pb").MsgExecLegacyContent,
  typeof import("@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/upgrade/v1beta1/upgrade_pb").SoftwareUpgradeProposal,
  typeof import("@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/upgrade/v1beta1/tx_pb").MsgSoftwareUpgrade,
  typeof import("@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/gov/v1beta1/gov_pb").TextProposal,
  typeof import("@buf/evmos_evmos.bufbuild_es/evmos/erc20/v1/erc20_pb").RegisterCoinProposal,
  typeof import("@buf/evmos_evmos.bufbuild_es/evmos/erc20/v1/erc20_pb").RegisterERC20Proposal,
  typeof import("@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/params/v1beta1/params_pb").ParameterChangeProposal,
  typeof import("@buf/cosmos_ibc.bufbuild_es/ibc/core/client/v1/client_pb").ClientUpdateProposal,
  typeof import("@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/distribution/v1beta1/distribution_pb").CommunityPoolSpendProposal,
  typeof import("@buf/evmos_evmos.bufbuild_es/evmos/erc20/v1/erc20_pb").ToggleTokenConversionProposal,
];
type ProtoTypeMap = {
  [T in Types[number] as T["typeName"]]: T;
};

export const isMessageType = <T extends keyof ProtoTypeMap>(
  msg: unknown,
  msgTypeName: T,
): msg is PlainMessage<
  InstanceType<ProtoTypeMap[T]> extends Message<any>
    ? InstanceType<ProtoTypeMap[T]>
    : never
> => {
  const msgType: unknown =
    get(msg, "typeUrl") ||
    get(msg, "type_url") ||
    get(msg, "type") ||
    get(msg, "@type");

  if (typeof msgType !== "string") return false;

  return msgTypeName.endsWith(msgTypeName);
};

export const assertMessageType = <T extends MessageType>(
  msg: unknown,
  msgProto: T,
): msg is PlainMessage<
  InstanceType<T> extends Message<any> ? InstanceType<T> : never
> => {
  const msgType: unknown =
    get(msg, "typeUrl") ||
    get(msg, "type_url") ||
    get(msg, "type") ||
    get(msg, "@type");

  if (typeof msgType !== "string") return false;

  const msgTypeName = msgType;
  if (msgTypeName === undefined) return false;
  console.log(msgTypeName, msgProto.typeName, msgType);

  return msgTypeName.endsWith(msgProto.typeName);
};
