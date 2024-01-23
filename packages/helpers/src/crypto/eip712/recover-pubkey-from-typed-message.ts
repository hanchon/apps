// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Hex } from "viem";
import { EvmosTypedData } from "./types";

import { recoverPublicKey } from "../recover-publickey";
import { hashTypedData } from "viem";

export const recoverPubkeyFromTypedMessage = (
  signature: Hex,
  typedMessage: EvmosTypedData,
) => {
  return recoverPublicKey({
    signature,
    hash: hashTypedData(typedMessage as never),
    isCompressed: true,
  });
};
