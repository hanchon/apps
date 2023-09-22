import { Address } from "../wallet";
import { Prefix } from "./types";
import { getChain } from "./get-chain";

export const getChainByAddress = (address: Address<Prefix>) => {
  return getChain(address);
};
