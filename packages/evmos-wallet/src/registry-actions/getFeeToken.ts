import { getToken } from "./get-token";
import { getChain } from "./get-chain";

export const getFeeToken = (address: string) => {
  const { prefix, feeToken } = getChain(address);
  return getToken(prefix, feeToken)!;
};
