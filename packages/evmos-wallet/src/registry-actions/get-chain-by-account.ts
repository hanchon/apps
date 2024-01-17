import { getChain } from "./get-chain";
import { Address } from "helpers/src/crypto/addresses/types";

export const getChainByAddress = (address: Address) => {
  return getChain(address);
};
