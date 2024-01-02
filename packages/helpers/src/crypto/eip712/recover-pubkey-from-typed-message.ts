import { Hex } from "viem";
import { EvmosTypedData } from "./types";
import { hashTypedData } from "./hash-typed-data";
import { recoverPublicKey } from "../recover-publickey";

export const recoverPubkeyFromTypedMessage = (
  signature: Hex,
  typedMessage: EvmosTypedData
) => {
  return recoverPublicKey({
    signature,
    hash: hashTypedData(typedMessage),
  });
};
