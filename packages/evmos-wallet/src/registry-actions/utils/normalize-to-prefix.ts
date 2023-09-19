import {
  Address,
  getPrefix,
  isValidCosmosAddress,
  isValidHexAddress,
} from "../../wallet";
import { Prefix } from "../types";
export type Receiverish = Address<Prefix> | Prefix;

export const normalizeToPrefix = (address: Receiverish) => {
  if (isValidHexAddress(address) || isValidCosmosAddress(address)) {
    return getPrefix(address);
  }
  return address;
};
