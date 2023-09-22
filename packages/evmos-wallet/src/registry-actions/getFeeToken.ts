import { Address } from "../wallet";
import { Prefix } from "./types";
import { getToken } from "./get-token";
import { getChain } from "./get-chain";

export const getFeeToken = (address: Prefix | Address<Prefix>) => {
  const { prefix, feeToken } = getChain(address);
  return getToken(prefix, feeToken)!;
};
